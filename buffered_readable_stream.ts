import { ReadableByteStream } from "./readable_byte_stream.ts";

/**
 * Options that can be passed to the {@linkcode BufferedReadableStream}
 * constructor.
 */
export interface BufferedReadableStreamOptions {
  /** The buffer size. */
  highWaterMark?: number | undefined;
}

/**
 * A buffered readable byte stream.
 *
 * As data is read from the buffered stream, the internal buffer is refilled as
 * necessary from the underlying stream.
 */
export class BufferedReadableStream extends ReadableByteStream {
  readonly #reader: ReadableStreamBYOBReader;
  #buffer: Uint8Array;

  /**
   * Creates a new {@linkcode BufferedReadableStream} to read data from the
   * specified underlying stream.
   *
   * The buffered stream holds a lock on the underlying stream. No other reader
   * can be acquired on the underlying stream until `releaseLock()` is called on
   * the buffered stream.
   *
   * ### Exceptions
   *
   * - {@linkcode RangeError} &ndash; The internal buffer cannot be allocated.
   * - {@linkcode TypeError} &ndash; `stream` is not a byte stream or is already
   *   locked.
   */
  constructor(
    stream: ReadableStream<Uint8Array>,
    options?: BufferedReadableStreamOptions,
  ) {
    const storage = new ArrayBuffer(options?.highWaterMark ?? 2048);
    const highWaterMark = storage.byteLength;
    if (highWaterMark === 0) {
      throw new RangeError("Buffer is empty");
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

  /** The number of valid bytes in the buffer. */
  get bufferedAmount(): number {
    return this.#buffer.length;
  }

  /**
   * Permanently locks this buffered stream and releases the lock on the
   * underlying stream.
   *
   * ### Exceptions
   *
   * - {@linkcode TypeError} &ndash; The buffered stream is locked.
   *
   * @returns The internal buffer containing data that has already been read
   * from the underlying stream.
   */
  releaseLock(): Uint8Array {
    this.getReader();
    this.#reader.releaseLock();
    const buffer = this.#buffer;
    this.#buffer = buffer.subarray(buffer.length);
    return buffer;
  }
}
