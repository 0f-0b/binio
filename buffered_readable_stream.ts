const ReadableByteStream: new (
  underlyingSource: UnderlyingByteSource,
) => ReadableStream<Uint8Array> = ReadableStream;

export interface BufferedReadableStreamOptions {
  highWaterMark?: number;
}

export class BufferedReadableStream extends ReadableByteStream {
  readonly #reader: ReadableStreamBYOBReader;
  #buffer: Uint8Array;

  constructor(
    stream: ReadableStream<Uint8Array>,
    options?: BufferedReadableStreamOptions,
  ) {
    const storage = new ArrayBuffer(options?.highWaterMark ?? 2048);
    const highWaterMark = storage.byteLength;
    if (highWaterMark === 0) {
      throw new TypeError("Buffer is empty");
    }
    super({
      pull: async (controller) => {
        const view = controller.byobRequest!.view!;
        const buf = new Uint8Array(
          view.buffer,
          view.byteOffset,
          view.byteLength,
        );
        const requested = buf.length;
        const reader = this.#reader;
        let buffer = this.#buffer;
        if (buffer.length === 0) {
          const highWaterMark = buffer.buffer.byteLength;
          if (requested >= highWaterMark) {
            const result = await reader.read(buf);
            if (result.done) {
              controller.close();
              controller.byobRequest!.respond(0);
              return;
            }
            controller.byobRequest!.respondWithNewView(result.value);
            return;
          }
          const result = await reader.read(new Uint8Array(buffer.buffer));
          if (result.done) {
            controller.close();
            controller.byobRequest!.respond(0);
            return;
          }
          buffer = result.value;
        }
        const available = Math.min(buffer.length, requested);
        buf.set(buffer.subarray(0, available));
        this.#buffer = buffer.subarray(available);
        controller.byobRequest!.respond(available);
      },
      cancel: (reason) => this.#reader.cancel(reason),
      type: "bytes",
      autoAllocateChunkSize: highWaterMark,
    });
    this.#reader = stream.getReader({ mode: "byob" });
    this.#buffer = new Uint8Array(storage, 0, 0);
  }

  get bufferedAmount(): number {
    return this.#buffer.length;
  }

  discardBuffer(): number {
    this.getReader();
    this.#reader.releaseLock();
    const buffer = this.#buffer;
    this.#buffer = buffer.subarray(buffer.length);
    return buffer.length;
  }
}
