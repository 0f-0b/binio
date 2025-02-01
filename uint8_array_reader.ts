import { ReadableByteStream } from "./readable_byte_stream.ts";

const { min } = Math;

/** A byte reader that consumes a {@linkcode Uint8Array}. */
export class Uint8ArrayReader {
  #buffer: Uint8Array<ArrayBuffer>;

  /**
   * Creates a new {@linkcode Uint8ArrayReader} with the provided
   * {@linkcode Uint8Array}.
   */
  constructor(bytes: Uint8Array<ArrayBuffer>) {
    this.#buffer = bytes;
  }

  /**
   * Consumes at most `buf.length` bytes from the start of the
   * {@linkcode Uint8Array} and writes them into `buf`.
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
   * Consumes all remaining bytes from the {@linkcode Uint8Array}.
   *
   * @returns The bytes read.
   */
  readAll(): Uint8Array<ArrayBuffer> {
    const buffer = this.#buffer;
    this.#buffer = buffer.subarray(buffer.length);
    return buffer;
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
          const read = reader.readAll();
          if (read.length !== 0) {
            controller.enqueue(read);
          }
          controller.close();
        }
      },
      type: "bytes",
    });
  }
}
