export interface BufferedWritableStreamOptions {
  highWaterMark?: number;
}

export class BufferedWritableStream
  extends WritableStream<Uint8Array | "flush"> {
  constructor(
    stream: WritableStream<Uint8Array>,
    options?: BufferedWritableStreamOptions,
  ) {
    const storage = new ArrayBuffer(options?.highWaterMark ?? 2048);
    const highWaterMark = storage.byteLength;
    if (highWaterMark === 0) {
      throw new TypeError("Buffer is empty");
    }
    const writer = stream.getWriter();
    let buffer = new Uint8Array(storage, 0, 0);
    super({
      async write(chunk) {
        if (chunk === "flush") {
          if (buffer.length !== 0) {
            const promise = writer.write(buffer.slice());
            buffer = buffer.subarray(0, 0);
            await promise;
          }
          return;
        }
        const provided = chunk.length;
        if (provided >= highWaterMark) {
          if (buffer.length !== 0) {
            writer.write(buffer.slice()).catch(() => {});
            buffer = buffer.subarray(0, 0);
          }
          await writer.write(chunk);
          return;
        }
        let flushed: Promise<undefined> | undefined;
        let buffered = buffer.length;
        if (buffered + provided > highWaterMark) {
          flushed = writer.write(buffer.slice()) as Promise<undefined>;
          buffered = 0;
        }
        buffer = new Uint8Array(buffer.buffer, 0, buffered + provided);
        buffer.set(chunk, buffered);
        if (flushed) {
          await flushed;
        }
      },
      async close() {
        if (buffer.length !== 0) {
          writer.write(buffer.slice()).catch(() => {});
        }
        await writer.close();
      },
      async abort(reason) {
        await writer.abort(reason);
      },
    });
  }
}
