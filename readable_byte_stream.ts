/**
 * Alias of the {@linkcode ReadableStream} constructor that only accepts a byte
 * source.
 */
export const ReadableByteStream: new (
  underlyingSource: UnderlyingByteSource,
) => ReadableStream<Uint8Array> = ReadableStream;
