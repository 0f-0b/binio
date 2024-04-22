/** A chunk that can be written to a {@linkcode BufferedWritableStream}. */
export type BufferedWriteChunkType =
  | Uint8Array
  | { type: "write"; data: Uint8Array }
  | { type: "flush" };

/**
 * Options that can be passed to the {@linkcode BufferedWritableStream}
 * constructor.
 */
export interface BufferedWritableStreamOptions {
  /** The buffer size. */
  highWaterMark?: number;
}

/**
 * A buffered writable byte stream.
 *
 * Small chunks of data written to the buffered stream are aggregated in the
 * internal buffer before being flushed to the underlying stream.
 */
export class BufferedWritableStream
  extends WritableStream<BufferedWriteChunkType> {
  readonly #writer: WritableStreamDefaultWriter<Uint8Array>;
  #buffer: Uint8Array;

  /**
   * Creates a new {@linkcode BufferedWritableStream} to write data to the
   * specified underlying stream.
   *
   * The buffered stream holds a lock on the underlying stream. No other writer
   * can be acquired on the underlying stream until `releaseLock()` is called on
   * the buffered stream.
   *
   * ### Exceptions
   *
   * - {@linkcode RangeError} &ndash; The internal buffer cannot be allocated.
   * - {@linkcode TypeError} &ndash; `stream` is already locked.
   */
  constructor(
    stream: WritableStream<Uint8Array>,
    options?: BufferedWritableStreamOptions,
  ) {
    const storage = new ArrayBuffer(options?.highWaterMark ?? 2048);
    const highWaterMark = storage.byteLength;
    if (highWaterMark === 0) {
      throw new RangeError("Buffer is empty");
    }
    super({
      write: async (chunk) => {
        if (ArrayBuffer.isView(chunk)) {
          chunk = { type: "write", data: chunk };
        }
        const writer = this.#writer;
        let buffer = this.#buffer;
        switch (chunk.type) {
          case "write": {
            const data = chunk.data;
            const provided = data.length;
            if (provided >= highWaterMark) {
              if (buffer.length !== 0) {
                writer.write(buffer.slice()).catch(() => {});
                this.#buffer = buffer.subarray(0, 0);
              }
              await writer.write(data);
              break;
            }
            let flushed: Promise<undefined> | undefined;
            let buffered = buffer.length;
            if (buffered + provided > highWaterMark) {
              flushed = writer.write(buffer.slice()) as Promise<undefined>;
              buffered = 0;
            }
            buffer = new Uint8Array(buffer.buffer, 0, buffered + provided);
            buffer.set(data, buffered);
            this.#buffer = buffer;
            if (flushed) {
              await flushed;
            }
            break;
          }
          case "flush": {
            if (buffer.length !== 0) {
              const promise = writer.write(buffer.slice());
              this.#buffer = buffer.subarray(0, 0);
              await promise;
            }
            break;
          }
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
   * @returns The internal buffer containing data that has not been written to
   * the underlying stream yet.
   */
  releaseLock(): Uint8Array {
    this.getWriter();
    this.#writer.releaseLock();
    const buffer = this.#buffer;
    this.#buffer = buffer.subarray(0, 0);
    return buffer;
  }
}
