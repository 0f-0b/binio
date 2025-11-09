const { max } = Math;

function mightGrow(array: Uint8Array, originalLength: number): boolean {
  return "growable" in array.buffer &&
    array.buffer.maxByteLength - array.byteOffset > originalLength;
}

/** A byte writer that produces a {@linkcode Uint8Array}. */
export class Uint8ArrayWriter {
  #buffer: Uint8Array<ArrayBuffer>;

  /**
   * Creates a new {@linkcode Uint8ArrayWriter} whose {@linkcode Uint8Array}
   * initially contains no bytes.
   */
  constructor() {
    const storage = new ArrayBuffer(16);
    this.#buffer = new Uint8Array(storage, 0, 0);
  }

  /** The {@linkcode Uint8Array} being produced. */
  get bytes(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  /**
   * Appends `chunk` to the {@linkcode Uint8Array}.
   *
   * ### Exceptions
   *
   * - {@linkcode RangeError} &ndash; The {@linkcode Uint8Array} cannot be
   *   reallocated.
   */
  write(chunk: Uint8Array): undefined {
    const buffer = this.#buffer;
    const provided = chunk.length;
    if (mightGrow(chunk, provided)) {
      chunk = chunk.subarray(0, provided);
    }
    const buffered = buffer.length;
    let storage = buffer.buffer;
    const total = buffered + provided;
    if (total > storage.byteLength) {
      storage = storage.transfer(max(total, storage.byteLength * 2));
    }
    this.#buffer = new Uint8Array(storage, 0, total);
    this.#buffer.set(chunk, buffered);
  }

  /** Returns a writable byte stream backed by this writer. */
  asStream(): Uint8ArrayWriterStream {
    return new Uint8ArrayWriterStream(this);
  }
}

/** A writable byte stream backed by a {@linkcode Uint8ArrayWriter}. */
export class Uint8ArrayWriterStream extends WritableStream<Uint8Array> {
  constructor(writer: Uint8ArrayWriter) {
    super({
      write(chunk) {
        writer.write(chunk);
      },
    });
  }
}
