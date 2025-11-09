/** An object that can synchronously read bytes from a source. */
export interface ReaderSync {
  /**
   * Reads up to `buf.length` bytes from the source into `buf`. If the number of
   * bytes read is less than `buf.length`, the reader is said to be _exhausted_,
   * and no more bytes can be read.
   *
   * ### Exceptions
   *
   * - {@linkcode TypeError} &ndash; `buf` is empty.
   *
   * @returns A {@linkcode Uint8Array} over the same memory region as the
   * original `buf` containing the bytes read.
   */
  read(buf: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer>;
}

/** An object that can synchronously write bytes to a destination. */
export interface WriterSync {
  /** Writes all bytes from `buf` to the destination. */
  write(buf: Uint8Array<ArrayBuffer>): undefined;
}

/**
 * Alias of the {@linkcode ReadableStream} constructor that only accepts a byte
 * source.
 */
export const ReadableByteStream: new (
  underlyingSource: UnderlyingByteSource,
) => ReadableStream<Uint8Array<ArrayBuffer>> = ReadableStream;
