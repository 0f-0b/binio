import type { Uint8ArrayReader } from "./uint8_array_reader.ts";
import { unexpectedEof } from "./unexpected_eof.ts";

/**
 * Reads exactly `buf.length` bytes from `r` into `buf`.
 *
 * After calling this function, `buf` is detached and no longer usable.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `buf` is empty, or `r.releaseLock()` is
 *   called before the returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to fill `buf`.
 *
 * @returns A {@linkcode Promise} that fulfills with a {@linkcode Uint8Array}
 * over the same memory region as the original `buf` containing the bytes read,
 * or `null` if the stream ends before any bytes are read.
 */
export async function readFull(
  r: ReadableStreamBYOBReader,
  buf: Uint8Array,
): Promise<Uint8Array | null> {
  const { value, done } = await r.read(buf, { min: buf.length });
  if (done) {
    if (!value || value.length === 0) {
      return null;
    }
    unexpectedEof();
  }
  return value;
}

/**
 * Reads exactly `buf.length` bytes from `r` into `buf`.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `buf` is empty.
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to fill `buf`.
 *
 * @returns A {@linkcode Uint8Array} over the same memory region as `buf`
 * containing the bytes read, or `null` if no bytes can be read.
 */
export function readFullSync(
  r: Uint8ArrayReader,
  buf: Uint8Array,
): Uint8Array | null {
  const requested = buf.length;
  buf = r.read(buf);
  if (buf.length === 0) {
    return null;
  }
  if (buf.length < requested) {
    unexpectedEof();
  }
  return buf;
}
