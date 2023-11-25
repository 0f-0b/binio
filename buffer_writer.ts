const { ceil, clz32, log2 } = Math;

function ceilLog2(x: number): number {
  x = +x;
  const x1 = x - 1;
  return x1 === x1 >>> 0 ? 32 - clz32(x1) : ceil(log2(x));
}

export class BufferWriter {
  #buffer: Uint8Array;

  constructor() {
    const storage = new ArrayBuffer(16);
    this.#buffer = new Uint8Array(storage, 0, 0);
  }

  get bytes(): Uint8Array {
    return this.#buffer;
  }

  write(chunk: Uint8Array): undefined {
    const provided = chunk.length;
    const buffered = this.#buffer.length;
    const storage = this.#buffer.buffer;
    const total = buffered + provided;
    if (total > storage.byteLength) {
      const storage = new ArrayBuffer(2 ** ceilLog2(total));
      const realloc = new Uint8Array(storage, 0, total);
      realloc.set(this.#buffer);
      this.#buffer = realloc;
    } else {
      this.#buffer = new Uint8Array(storage, 0, total);
    }
    this.#buffer.set(chunk, buffered);
  }

  asStream(): WritableStream<Uint8Array> {
    return new BufferWriterStream(this);
  }
}

export class BufferWriterStream extends WritableStream<Uint8Array> {
  constructor(writer: BufferWriter) {
    super({
      write(chunk) {
        writer.write(chunk);
      },
    });
  }
}
