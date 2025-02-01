import {
  encodeBigVarInt64LE,
  encodeBigVarUint64BE,
  encodeBigVarUint64LE,
  encodeVarInt32LE,
  encodeVarUint32BE,
  encodeVarUint32LE,
} from "./encode_varint.ts";
import { readFull, readFullSync } from "./read_full.ts";
import type { Uint8ArrayReader } from "./uint8_array_reader.ts";
import type { Uint8ArrayWriter } from "./uint8_array_writer.ts";
import { unexpectedEof } from "./unexpected_eof.ts";

const { min } = Math;
const syncBuf8 = new Uint8Array(8);
const syncBuf4 = syncBuf8.subarray(0, 4);
const syncBuf2 = syncBuf8.subarray(0, 2);
const syncBuf1 = syncBuf8.subarray(0, 1);
const syncView = new DataView(syncBuf8.buffer);
const shift = Object.freeze([0n, 7n, 14n, 21n, 28n, 35n, 42n, 49n, 56n, 63n]);

/**
 * Reads an 8-bit signed integer from `r`.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readInt8(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(1));
  return buf && new DataView(buf.buffer).getInt8(0);
}

/**
 * Reads an 8-bit signed integer from `r`.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readInt8Sync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf1) && syncView.getInt8(0);
}

/**
 * Reads an 8-bit unsigned integer from `r`.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readUint8(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(1));
  return buf && new DataView(buf.buffer).getUint8(0);
}

/**
 * Reads an 8-bit unsigned integer from `r`.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readUint8Sync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf1) && syncView.getUint8(0);
}

/**
 * Reads a 16-bit signed integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 16-bit signed integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readInt16LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(2));
  return buf && new DataView(buf.buffer).getInt16(0, true);
}

/**
 * Reads a 16-bit signed integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 16-bit signed integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readInt16LESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf2) && syncView.getInt16(0, true);
}

/**
 * Reads a 16-bit signed integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 16-bit signed integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readInt16BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(2));
  return buf && new DataView(buf.buffer).getInt16(0);
}

/**
 * Reads a 16-bit signed integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 16-bit signed integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readInt16BESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf2) && syncView.getInt16(0);
}

/**
 * Reads a 16-bit unsigned integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 16-bit unsigned integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readUint16LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(2));
  return buf && new DataView(buf.buffer).getUint16(0, true);
}

/**
 * Reads a 16-bit unsigned integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 16-bit unsigned integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readUint16LESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf2) && syncView.getUint16(0, true);
}

/**
 * Reads a 16-bit unsigned integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 16-bit unsigned integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readUint16BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(2));
  return buf && new DataView(buf.buffer).getUint16(0);
}

/**
 * Reads a 16-bit unsigned integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 16-bit unsigned integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readUint16BESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf2) && syncView.getUint16(0);
}

/**
 * Reads a 32-bit signed integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 32-bit signed integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readInt32LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getInt32(0, true);
}

/**
 * Reads a 32-bit signed integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 32-bit signed integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readInt32LESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getInt32(0, true);
}

/**
 * Reads a 32-bit signed integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 32-bit signed integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readInt32BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getInt32(0);
}

/**
 * Reads a 32-bit signed integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 32-bit signed integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readInt32BESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getInt32(0);
}

/**
 * Reads a 32-bit unsigned integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 32-bit unsigned integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readUint32LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getUint32(0, true);
}

/**
 * Reads a 32-bit unsigned integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 32-bit unsigned integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readUint32LESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getUint32(0, true);
}

/**
 * Reads a 32-bit unsigned integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 32-bit unsigned integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readUint32BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getUint32(0);
}

/**
 * Reads a 32-bit unsigned integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 32-bit unsigned integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readUint32BESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getUint32(0);
}

/**
 * Reads a 64-bit signed integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 64-bit signed integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readBigInt64LE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getBigInt64(0, true);
}

/**
 * Reads a 64-bit signed integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 64-bit signed integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readBigInt64LESync(r: Uint8ArrayReader): bigint | null {
  return readFullSync(r, syncBuf8) && syncView.getBigInt64(0, true);
}

/**
 * Reads a 64-bit signed integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 64-bit signed integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readBigInt64BE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getBigInt64(0);
}

/**
 * Reads a 64-bit signed integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 64-bit signed integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readBigInt64BESync(r: Uint8ArrayReader): bigint | null {
  return readFullSync(r, syncBuf8) && syncView.getBigInt64(0);
}

/**
 * Reads a 64-bit unsigned integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 64-bit unsigned integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readBigUint64LE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getBigUint64(0, true);
}

/**
 * Reads a 64-bit unsigned integer from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 64-bit unsigned integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readBigUint64LESync(r: Uint8ArrayReader): bigint | null {
  return readFullSync(r, syncBuf8) && syncView.getBigUint64(0, true);
}

/**
 * Reads a 64-bit unsigned integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 64-bit unsigned integer.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readBigUint64BE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getBigUint64(0);
}

/**
 * Reads a 64-bit unsigned integer from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 64-bit unsigned integer.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readBigUint64BESync(r: Uint8ArrayReader): bigint | null {
  return readFullSync(r, syncBuf8) && syncView.getBigUint64(0);
}

/**
 * Reads a 32-bit signed integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 32-bit signed integer can be encoded to, or
 *   `r.releaseLock()` is called before the returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the last
 *   byte have the continuation bit set.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readVarInt32LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  let result = 0;
  let len = 0;
  for (;;) {
    const b = await readUint8(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= (b & 0x7f) << (len * 7);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 5) {
      throw new TypeError("Varint is too long");
    }
  }
  const shift = 32 - min((len + 1) * 7, 32);
  return result << shift >> shift;
}

/**
 * Reads a 32-bit signed integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 32-bit signed integer can be encoded to.
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the last
 *   byte have the continuation bit set.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readVarInt32LESync(r: Uint8ArrayReader): number | null {
  let result = 0;
  let len = 0;
  for (;;) {
    const b = readUint8Sync(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= (b & 0x7f) << (len * 7);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 5) {
      throw new TypeError("Varint is too long");
    }
  }
  const shift = 32 - min((len + 1) * 7, 32);
  return result << shift >> shift;
}

/**
 * Reads a 32-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 32-bit unsigned integer can be encoded to, or
 *   `r.releaseLock()` is called before the returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the last
 *   byte have the continuation bit set.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readVarUint32LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  let result = 0;
  let len = 0;
  for (;;) {
    const b = await readUint8(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= (b & 0x7f) << (len * 7);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 5) {
      throw new TypeError("Varint is too long");
    }
  }
  return result >>> 0;
}

/**
 * Reads a 32-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 32-bit unsigned integer can be encoded to.
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the last
 *   byte have the continuation bit set.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readVarUint32LESync(r: Uint8ArrayReader): number | null {
  let result = 0;
  let len = 0;
  for (;;) {
    const b = readUint8Sync(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= (b & 0x7f) << (len * 7);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 5) {
      throw new TypeError("Varint is too long");
    }
  }
  return result >>> 0;
}

/**
 * Reads a 32-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 32-bit unsigned integer can be encoded to, or
 *   `r.releaseLock()` is called before the returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the last
 *   byte have the continuation bit set.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readVarUint32BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  let result = 0;
  let len = 0;
  for (;;) {
    const b = await readUint8(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result = (result << 7) | (b & 0x7f);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 5) {
      throw new TypeError("Varint is too long");
    }
  }
  return result >>> 0;
}

/**
 * Reads a 32-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 32-bit unsigned integer can be encoded to.
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the last
 *   byte have the continuation bit set.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readVarUint32BESync(r: Uint8ArrayReader): number | null {
  let result = 0;
  let len = 0;
  for (;;) {
    const b = readUint8Sync(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result = (result << 7) | (b & 0x7f);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 5) {
      throw new TypeError("Varint is too long");
    }
  }
  return result >>> 0;
}

/**
 * Reads a 64-bit signed integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 64-bit signed integer can be encoded to, or
 *   `r.releaseLock()` is called before the returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the last
 *   byte have the continuation bit set.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readBigVarInt64LE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  let result = 0n;
  let len = 0;
  for (;;) {
    const b = await readUint8(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= BigInt(b & 0x7f) << shift[len];
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  const width = min((len + 1) * 7, 64);
  return BigInt.asIntN(width, result);
}

/**
 * Reads a 64-bit signed integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 64-bit signed integer can be encoded to.
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the last
 *   byte have the continuation bit set.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readBigVarInt64LESync(r: Uint8ArrayReader): bigint | null {
  let result = 0n;
  let len = 0;
  for (;;) {
    const b = readUint8Sync(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= BigInt(b & 0x7f) << shift[len];
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  const width = min((len + 1) * 7, 64);
  return BigInt.asIntN(width, result);
}

/**
 * Reads a 64-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 64-bit unsigned integer can be encoded to, or
 *   `r.releaseLock()` is called before the returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the last
 *   byte have the continuation bit set.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readBigVarUint64LE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  let result = 0n;
  let len = 0;
  for (;;) {
    const b = await readUint8(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= BigInt(b & 0x7f) << shift[len];
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  return BigInt.asUintN(64, result);
}

/**
 * Reads a 64-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 64-bit unsigned integer can be encoded to.
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the last
 *   byte have the continuation bit set.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readBigVarUint64LESync(r: Uint8ArrayReader): bigint | null {
  let result = 0n;
  let len = 0;
  for (;;) {
    const b = readUint8Sync(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result |= BigInt(b & 0x7f) << shift[len];
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  return BigInt.asUintN(64, result);
}

/**
 * Reads a 64-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 64-bit unsigned integer can be encoded to, or
 *   `r.releaseLock()` is called before the returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the last
 *   byte have the continuation bit set.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readBigVarUint64BE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  let result = 0n;
  let len = 0;
  for (;;) {
    const b = await readUint8(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result = (result << 7n) | BigInt(b & 0x7f);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  return BigInt.asUintN(64, result);
}

/**
 * Reads a 64-bit unsigned integer from `r` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The number of bytes with the continuation bit
 *   set exceeds the maximum a 64-bit unsigned integer can be encoded to.
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the last
 *   byte have the continuation bit set.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readBigVarUint64BESync(r: Uint8ArrayReader): bigint | null {
  let result = 0n;
  let len = 0;
  for (;;) {
    const b = readUint8Sync(r);
    if (b === null) {
      if (len > 0) {
        unexpectedEof();
      }
      return null;
    }
    result = (result << 7n) | BigInt(b & 0x7f);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  return BigInt.asUintN(64, result);
}

/**
 * Reads a 32-bit floating-point number from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 32-bit floating-point number.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readFloat32LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getFloat32(0, true);
}

/**
 * Reads a 32-bit floating-point number from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 32-bit floating-point number.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readFloat32LESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getFloat32(0, true);
}

/**
 * Reads a 32-bit floating-point number from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 32-bit floating-point number.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readFloat32BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getFloat32(0);
}

/**
 * Reads a 32-bit floating-point number from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 32-bit floating-point number.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readFloat32BESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getFloat32(0);
}

/**
 * Reads a 64-bit floating-point number from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 64-bit floating-point number.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readFloat64LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getFloat64(0, true);
}

/**
 * Reads a 64-bit floating-point number from `r` in little-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 64-bit floating-point number.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readFloat64LESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf8) && syncView.getFloat64(0, true);
}

/**
 * Reads a 64-bit floating-point number from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; `r.releaseLock()` is called before the
 *   returned promise resolves.
 * - {@linkcode UnexpectedEof} &ndash; The stream reaches the end but the bytes
 *   read are not enough to form a 64-bit floating-point number.
 *
 * @returns A {@linkcode Promise} that fulfills with the resulting value, or
 * `null` if the stream ends before any bytes are read.
 */
export async function readFloat64BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getFloat64(0);
}

/**
 * Reads a 64-bit floating-point number from `r` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode UnexpectedEof} &ndash; `r` is completely consumed but the bytes
 *   read are not enough to form a 64-bit floating-point number.
 *
 * @returns The resulting value, or `null` if no bytes can be read.
 */
export function readFloat64BESync(r: Uint8ArrayReader): number | null {
  return readFullSync(r, syncBuf8) && syncView.getFloat64(0);
}

/**
 * Writes the 8-bit signed or unsigned integer `value` to `w`.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeInt8(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(1);
  new DataView(buf.buffer).setInt8(0, value);
  await w.write(buf);
}

/** Writes the 8-bit signed or unsigned integer `value` to `w`. */
export function writeInt8Sync(w: Uint8ArrayWriter, value: number): undefined {
  syncView.setInt8(0, value);
  w.write(syncBuf1);
}

/**
 * Writes the 16-bit signed or unsigned integer `value` to `w` in little-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeInt16LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(2);
  new DataView(buf.buffer).setInt16(0, value, true);
  await w.write(buf);
}

/**
 * Writes the 16-bit signed or unsigned integer `value` to `w` in little-endian
 * format.
 */
export function writeInt16LESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setInt16(0, value, true);
  w.write(syncBuf2);
}

/**
 * Writes the 16-bit signed or unsigned integer `value` to `w` in big-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeInt16BE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(2);
  new DataView(buf.buffer).setInt16(0, value);
  await w.write(buf);
}

/**
 * Writes the 16-bit signed or unsigned integer `value` to `w` in big-endian
 * format.
 */
export function writeInt16BESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setInt16(0, value);
  w.write(syncBuf2);
}

/**
 * Writes the 32-bit signed or unsigned integer `value` to `w` in little-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeInt32LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(4);
  new DataView(buf.buffer).setInt32(0, value, true);
  await w.write(buf);
}

/**
 * Writes the 32-bit signed or unsigned integer `value` to `w` in little-endian
 * format.
 */
export function writeInt32LESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setInt32(0, value, true);
  w.write(syncBuf4);
}

/**
 * Writes the 32-bit signed or unsigned integer `value` to `w` in big-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeInt32BE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(4);
  new DataView(buf.buffer).setInt32(0, value);
  await w.write(buf);
}

/**
 * Writes the 32-bit signed or unsigned integer `value` to `w` in big-endian
 * format.
 */
export function writeInt32BESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setInt32(0, value);
  w.write(syncBuf4);
}

/**
 * Writes the 64-bit signed or unsigned integer `value` to `w` in little-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeBigInt64LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: bigint,
): Promise<undefined> {
  const buf = new Uint8Array(8);
  new DataView(buf.buffer).setBigInt64(0, value, true);
  await w.write(buf);
}

/**
 * Writes the 64-bit signed or unsigned integer `value` to `w` in little-endian
 * format.
 */
export function writeBigInt64LESync(
  w: Uint8ArrayWriter,
  value: bigint,
): undefined {
  syncView.setBigInt64(0, value, true);
  w.write(syncBuf8);
}

/**
 * Writes the 64-bit signed or unsigned integer `value` to `w` in big-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeBigInt64BE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: bigint,
): Promise<undefined> {
  const buf = new Uint8Array(8);
  new DataView(buf.buffer).setBigInt64(0, value);
  await w.write(buf);
}

/**
 * Writes the 64-bit signed or unsigned integer `value` to `w` in big-endian
 * format.
 */
export function writeBigInt64BESync(
  w: Uint8ArrayWriter,
  value: bigint,
): undefined {
  syncView.setBigInt64(0, value);
  w.write(syncBuf8);
}

/**
 * Writes the 32-bit signed integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeVarInt32LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  await w.write(encodeVarInt32LE(value, true));
}

/**
 * Writes the 32-bit signed integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 */
export function writeVarInt32LESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  w.write(encodeVarInt32LE(value, false));
}

/**
 * Writes the 32-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeVarUint32LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  await w.write(encodeVarUint32LE(value, true));
}

/**
 * Writes the 32-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 */
export function writeVarUint32LESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  w.write(encodeVarUint32LE(value, false));
}

/**
 * Writes the 32-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeVarUint32BE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  await w.write(encodeVarUint32BE(value, true));
}

/**
 * Writes the 32-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 */
export function writeVarUint32BESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  w.write(encodeVarUint32BE(value, false));
}

/**
 * Writes the 64-bit signed integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeBigVarInt64LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: bigint,
): Promise<undefined> {
  await w.write(encodeBigVarInt64LE(value, true));
}

/**
 * Writes the 64-bit signed integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 */
export function writeBigVarInt64LESync(
  w: Uint8ArrayWriter,
  value: bigint,
): undefined {
  w.write(encodeBigVarInt64LE(value, false));
}

/**
 * Writes the 64-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeBigVarUint64LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: bigint,
): Promise<undefined> {
  await w.write(encodeBigVarUint64LE(value, true));
}

/**
 * Writes the 64-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} format.
 */
export function writeBigVarUint64LESync(
  w: Uint8ArrayWriter,
  value: bigint,
): undefined {
  w.write(encodeBigVarUint64LE(value, false));
}

/**
 * Writes the 64-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeBigVarUint64BE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: bigint,
): Promise<undefined> {
  await w.write(encodeBigVarUint64BE(value, true));
}

/**
 * Writes the 64-bit unsigned integer `value` to `w` in
 * {@link https://en.wikipedia.org/wiki/Variable-length_quantity VLQ} format.
 */
export function writeBigVarUint64BESync(
  w: Uint8ArrayWriter,
  value: bigint,
): undefined {
  w.write(encodeBigVarUint64BE(value, false));
}

/**
 * Writes the 32-bit floating-point number `value` to `w` in little-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeFloat32LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(4);
  new DataView(buf.buffer).setFloat32(0, value, true);
  await w.write(buf);
}

/**
 * Writes the 32-bit floating-point number `value` to `w` in little-endian
 * format.
 */
export function writeFloat32LESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setFloat32(0, value, true);
  w.write(syncBuf4);
}

/**
 * Writes the 32-bit floating-point number `value` to `w` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeFloat32BE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(4);
  new DataView(buf.buffer).setFloat32(0, value);
  await w.write(buf);
}

/**
 * Writes the 32-bit floating-point number `value` to `w` in big-endian format.
 */
export function writeFloat32BESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setFloat32(0, value);
  w.write(syncBuf4);
}

/**
 * Writes the 64-bit floating-point number `value` to `w` in little-endian
 * format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeFloat64LE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(8);
  new DataView(buf.buffer).setFloat64(0, value, true);
  await w.write(buf);
}

/**
 * Writes the 64-bit floating-point number `value` to `w` in little-endian
 * format.
 */
export function writeFloat64LESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setFloat64(0, value, true);
  w.write(syncBuf8);
}

/**
 * Writes the 64-bit floating-point number `value` to `w` in big-endian format.
 *
 * ### Exceptions
 *
 * - {@linkcode TypeError} &ndash; The stream is closed.
 */
export async function writeFloat64BE(
  w: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(8);
  new DataView(buf.buffer).setFloat64(0, value);
  await w.write(buf);
}

/**
 * Writes the 64-bit floating-point number `value` to `w` in big-endian format.
 */
export function writeFloat64BESync(
  w: Uint8ArrayWriter,
  value: number,
): undefined {
  syncView.setFloat64(0, value);
  w.write(syncBuf8);
}
