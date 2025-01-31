const { isFinite } = Number;
const f64Buf = new Float64Array(1);
const u64Buf = new BigUint64Array(f64Buf.buffer);

/**
 * Returns the smallest integral power of two that is not smaller than `x`,
 * or `NaN` if `x` is `NaN`.
 */
function bitCeil(x: number): number {
  if (x <= 1) {
    return 1;
  }
  if (!isFinite(x)) {
    return x;
  }
  f64Buf[0] = x;
  u64Buf[0] = ((u64Buf[0] - 1n) | 0xfffffffffffffn) + 1n;
  return f64Buf[0];
}

/** A byte writer that produces a {@linkcode Uint8Array}. */
export class Uint8ArrayWriter {
  #buffer: Uint8Array;

  /**
   * Creates a new {@linkcode Uint8ArrayWriter} whose {@linkcode Uint8Array}
   * initially contains no bytes.
   */
  constructor() {
    const storage = new ArrayBuffer(16);
    this.#buffer = new Uint8Array(storage, 0, 0);
  }

  /** The {@linkcode Uint8Array} being produced. */
  get bytes(): Uint8Array {
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
    const provided = chunk.length;
    const buffered = this.#buffer.length;
    const storage = this.#buffer.buffer;
    const total = buffered + provided;
    if (total > storage.byteLength) {
      const storage = new ArrayBuffer(bitCeil(total));
      const realloc = new Uint8Array(storage, 0, total);
      realloc.set(this.#buffer);
      this.#buffer = realloc;
    } else {
      this.#buffer = new Uint8Array(storage, 0, total);
    }
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
