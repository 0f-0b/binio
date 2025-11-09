import { ReadableByteStream, type ReaderSync } from "./types.ts";

const { min } = Math;

/** A byte reader that consumes a {@linkcode Uint8Array}. */
export class Uint8ArrayReader implements ReaderSync {
  #buffer: Uint8Array<ArrayBuffer>;

  /**
   * Creates a new {@linkcode Uint8ArrayReader} with the provided
   * {@linkcode Uint8Array}.
   */
  constructor(bytes: Uint8Array<ArrayBuffer>) {
    this.#buffer = bytes;
  }

  /** The yet unread part of the {@linkcode Uint8Array}. */
  get remaining(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  /**
   * Copies up to `buf.length` bytes from the {@linkcode Uint8Array} into `buf`.
   *
   * ### Exceptions
   *
   * - {@linkcode TypeError} &ndash; `buf` is empty.
   *
   * @returns A {@linkcode Uint8Array} over the same memory region as the
   * original `buf` containing the bytes read.
   */
  read<B extends ArrayBufferLike>(buf: Uint8Array<B>): Uint8Array<B> {
    const buffer = this.#buffer;
    const requested = buf.length;
    if (requested === 0) {
      throw new TypeError("Cannot read into empty view");
    }
    const available = min(buffer.length, requested);
    buf = buf.subarray(0, available);
    buf.set(buffer.subarray(0, available));
    this.#buffer = buffer.subarray(available);
    return buf;
  }

  /**
   * Skips over and discards up to `n` bytes from the {@linkcode Uint8Array}.
   *
   * @returns The number of bytes skipped.
   */
  skip(n: number): number {
    const buffer = this.#buffer;
    const available = min(buffer.length, n);
    this.#buffer = buffer.subarray(available);
    return available;
  }

  /** Returns a readable byte stream backed by this reader. */
  asStream(): Uint8ArrayReaderStream {
    return new Uint8ArrayReaderStream(this);
  }
}

/** A readable byte stream backed by a {@linkcode Uint8ArrayReader}. */
export class Uint8ArrayReaderStream extends ReadableByteStream {
  constructor(reader: Uint8ArrayReader) {
    super({
      pull(controller) {
        if (controller.byobRequest) {
          const view = controller.byobRequest.view!;
          const buf = new Uint8Array(
            view.buffer,
            view.byteOffset,
            view.byteLength,
          );
          const read = reader.read(buf);
          if (read.length === 0) {
            controller.close();
          }
          controller.byobRequest.respond(read.length);
        } else {
          const bytes = reader.remaining;
          if (bytes.length !== 0) {
            reader.skip(bytes.length);
            controller.enqueue(bytes);
          }
          controller.close();
        }
      },
      type: "bytes",
    });
  }
}
