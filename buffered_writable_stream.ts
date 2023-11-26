export interface BufferedWritableStreamOptions {
  highWaterMark?: number;
}

export class BufferedWritableStream
  extends WritableStream<Uint8Array | "flush"> {
  readonly #writer: WritableStreamDefaultWriter<Uint8Array>;
  #buffer: Uint8Array;

  constructor(
    stream: WritableStream<Uint8Array>,
    options?: BufferedWritableStreamOptions,
  ) {
    const storage = new ArrayBuffer(options?.highWaterMark ?? 2048);
    const highWaterMark = storage.byteLength;
    if (highWaterMark === 0) {
      throw new TypeError("Buffer is empty");
    }
    super({
      write: async (chunk) => {
        const writer = this.#writer;
        let buffer = this.#buffer;
        if (chunk === "flush") {
          if (buffer.length !== 0) {
            const promise = writer.write(buffer.slice());
            this.#buffer = buffer.subarray(0, 0);
            await promise;
          }
          return;
        }
        const provided = chunk.length;
        if (provided >= highWaterMark) {
          if (buffer.length !== 0) {
            writer.write(buffer.slice()).catch(() => {});
            this.#buffer = buffer.subarray(0, 0);
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
        this.#buffer = buffer;
        if (flushed) {
          await flushed;
        }
      },
      close: async () => {
        const writer = this.#writer;
        const buffer = this.#buffer;
        if (buffer.length !== 0) {
          writer.write(buffer.slice()).catch(() => {});
          this.#buffer = buffer.subarray(0, 0);
        }
        await writer.close();
      },
      abort: (reason) => this.#writer.abort(reason),
    });
    this.#writer = stream.getWriter();
    this.#buffer = new Uint8Array(storage, 0, 0);
  }

  get bufferedAmount(): number {
    return this.#buffer.length;
  }

  discardBuffer(): number {
    this.getWriter();
    this.#writer.releaseLock();
    const buffer = this.#buffer;
    this.#buffer = buffer.subarray(0, 0);
    return buffer.length;
  }
}
