/**
 * Alias of the {@linkcode ReadableStream} constructor that only accepts a byte
 * source.
 */
export const ReadableByteStream = ReadableStream as new (
  underlyingSource: UnderlyingByteSource,
) => ReadableStream<Uint8Array<ArrayBuffer>>;
