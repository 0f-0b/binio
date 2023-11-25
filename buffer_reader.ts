const ReadableByteStream: new (
  underlyingSource: UnderlyingByteSource,
) => ReadableStream<Uint8Array> = ReadableStream;

export class BufferReader {
  #buffer: Uint8Array;

  constructor(bytes: Uint8Array) {
    this.#buffer = bytes;
  }

  read(buf: Uint8Array): Uint8Array {
    const requested = buf.length;
    if (requested === 0) {
      throw new TypeError("Cannot read into empty view");
    }
    const available = Math.min(this.#buffer.length, requested);
    buf.set(this.#buffer.subarray(0, available));
    this.#buffer = this.#buffer.subarray(available);
    return buf.subarray(0, available);
  }

  readAll(): Uint8Array {
    const buffer = this.#buffer;
    this.#buffer = buffer.subarray(buffer.length);
    return buffer;
  }

  asStream(): ReadableStream<Uint8Array> {
    return new BufferReaderStream(this);
  }
}

export class BufferReaderStream extends ReadableByteStream {
  constructor(reader: BufferReader) {
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
