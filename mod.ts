import { assert } from "./deps/std/assert/assert.ts";
import { BufReader, PartialReadError } from "./deps/std/io/buf_reader.ts";
import { BufWriter } from "./deps/std/io/buf_writer.ts";
import { Buffer } from "./deps/std/io/buffer.ts";

import {
  encodeBigVarInt64BE,
  encodeBigVarInt64LE,
  encodeVarInt32BE,
  encodeVarInt32LE,
} from "./varint.ts";

export { Buffer, BufReader, BufWriter };
const syncBuf8 = new Uint8Array(8);
const syncBuf4 = syncBuf8.subarray(0, 4);
const syncBuf2 = syncBuf8.subarray(0, 2);
const syncBuf1 = syncBuf8.subarray(0, 1);
const syncView = new DataView(syncBuf8.buffer);

export function unexpectedEof(): never {
  throw new Deno.errors.UnexpectedEof();
}

export async function readFull(
  r: BufReader,
  buf: Uint8Array,
): Promise<Uint8Array | null> {
  try {
    return await r.readFull(buf);
  } catch (e: unknown) {
    if (!(e instanceof PartialReadError)) {
      throw e;
    }
    unexpectedEof();
  }
}

export function readFullSync(r: Buffer, buf: Uint8Array): Uint8Array | null {
  const read = r.readSync(buf);
  if (read === null) {
    return null;
  }
  if (read < buf.length) {
    unexpectedEof();
  }
  return buf;
}

export async function readUint8(r: BufReader): Promise<number | null> {
  return await r.readByte();
}

export function readUint8Sync(r: Buffer): number | null {
  if (readFullSync(r, syncBuf1) === null) {
    return null;
  }
  return syncView.getUint8(0);
}

export async function readUint16LE(r: BufReader): Promise<number | null> {
  const low = await readUint8(r);
  if (low === null) {
    return null;
  }
  const high = await readUint8(r) ?? unexpectedEof();
  return low | (high << 8);
}

export function readUint16LESync(r: Buffer): number | null {
  if (readFullSync(r, syncBuf2) === null) {
    return null;
  }
  return syncView.getUint16(0, true);
}

export async function readUint16BE(r: BufReader): Promise<number | null> {
  const high = await readUint8(r);
  if (high === null) {
    return null;
  }
  const low = await readUint8(r) ?? unexpectedEof();
  return low | (high << 8);
}

export function readUint16BESync(r: Buffer): number | null {
  if (readFullSync(r, syncBuf2) === null) {
    return null;
  }
  return syncView.getUint16(0);
}

export async function readUint32LE(r: BufReader): Promise<number | null> {
  const low = await readUint16LE(r);
  if (low === null) {
    return null;
  }
  const high = await readUint16LE(r) ?? unexpectedEof();
  return (low | (high << 16)) >>> 0;
}

export function readUint32LESync(r: Buffer): number | null {
  if (readFullSync(r, syncBuf4) === null) {
    return null;
  }
  return syncView.getUint32(0, true);
}

export async function readUint32BE(r: BufReader): Promise<number | null> {
  const high = await readUint16BE(r);
  if (high === null) {
    return null;
  }
  const low = await readUint16BE(r) ?? unexpectedEof();
  return (low | (high << 16)) >>> 0;
}

export function readUint32BESync(r: Buffer): number | null {
  if (readFullSync(r, syncBuf4) === null) {
    return null;
  }
  return syncView.getUint32(0);
}

export async function readBigUint64LE(r: BufReader): Promise<bigint | null> {
  const low = await readUint32LE(r);
  if (low === null) {
    return null;
  }
  const high = await readUint32LE(r) ?? unexpectedEof();
  return BigInt(low) | (BigInt(high) << 32n);
}

export function readBigUint64LESync(r: Buffer): bigint | null {
  if (readFullSync(r, syncBuf8) === null) {
    return null;
  }
  return syncView.getBigUint64(0, true);
}

export async function readBigUint64BE(r: BufReader): Promise<bigint | null> {
  const high = await readUint32BE(r);
  if (high === null) {
    return null;
  }
  const low = await readUint32BE(r) ?? unexpectedEof();
  return BigInt(low) | (BigInt(high) << 32n);
}

export function readBigUint64BESync(r: Buffer): bigint | null {
  if (readFullSync(r, syncBuf8) === null) {
    return null;
  }
  return syncView.getBigUint64(0);
}

export async function readVarUint32LE(r: BufReader): Promise<number | null> {
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

export function readVarUint32LESync(r: Buffer): number | null {
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

export async function readVarUint32BE(r: BufReader): Promise<number | null> {
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

export function readVarUint32BESync(r: Buffer): number | null {
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

export async function readBigVarUint64LE(r: BufReader): Promise<bigint | null> {
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
    result |= BigInt(b & 0x7f) << BigInt(len * 7);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  return BigInt.asUintN(64, result);
}

export function readBigVarUint64LESync(r: Buffer): bigint | null {
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
    result |= BigInt(b & 0x7f) << BigInt(len * 7);
    if (!(b & 0x80)) {
      break;
    }
    if (++len === 10) {
      throw new TypeError("Varint is too long");
    }
  }
  return BigInt.asUintN(64, result);
}

export async function readBigVarUint64BE(r: BufReader): Promise<bigint | null> {
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

export function readBigVarUint64BESync(r: Buffer): bigint | null {
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

export async function writeInt8(
  w: BufWriter,
  value: number,
): Promise<undefined> {
  value &= 0xff;
  if (w.err !== null) {
    throw w.err;
  }
  if (w.available() === 0) {
    assert(w.size() !== 0);
    await w.flush();
  }
  w.buf[w.usedBufferBytes++] = value;
}

export function writeInt8Sync(w: Buffer, value: number): undefined {
  syncView.setInt8(0, value);
  w.writeSync(syncBuf1);
}

export async function writeInt16LE(
  w: BufWriter,
  value: number,
): Promise<undefined> {
  value &= 0xffff;
  await writeInt8(w, value);
  await writeInt8(w, value >>> 8);
}

export function writeInt16LESync(w: Buffer, value: number): undefined {
  syncView.setInt16(0, value, true);
  w.writeSync(syncBuf2);
}

export async function writeInt16BE(
  w: BufWriter,
  value: number,
): Promise<undefined> {
  value &= 0xffff;
  await writeInt8(w, value >>> 8);
  await writeInt8(w, value);
}

export function writeInt16BESync(w: Buffer, value: number): undefined {
  syncView.setInt16(0, value);
  w.writeSync(syncBuf2);
}

export async function writeInt32LE(
  w: BufWriter,
  value: number,
): Promise<undefined> {
  value >>>= 0;
  await writeInt16LE(w, value);
  await writeInt16LE(w, value >>> 16);
}

export function writeInt32LESync(w: Buffer, value: number): undefined {
  syncView.setInt32(0, value, true);
  w.writeSync(syncBuf4);
}

export async function writeInt32BE(
  w: BufWriter,
  value: number,
): Promise<undefined> {
  value >>>= 0;
  await writeInt16BE(w, value >>> 16);
  await writeInt16BE(w, value);
}

export function writeInt32BESync(w: Buffer, value: number): undefined {
  syncView.setInt32(0, value);
  w.writeSync(syncBuf4);
}

export async function writeBigInt64LE(
  w: BufWriter,
  value: bigint,
): Promise<undefined> {
  value = BigInt.asUintN(64, value);
  await writeInt32LE(w, Number(BigInt.asUintN(32, value)));
  await writeInt32LE(w, Number(BigInt.asUintN(32, value >> 32n)));
}

export function writeBigInt64LESync(w: Buffer, value: bigint): undefined {
  syncView.setBigInt64(0, value, true);
  w.writeSync(syncBuf8);
}

export async function writeBigInt64BE(
  w: BufWriter,
  value: bigint,
): Promise<undefined> {
  value = BigInt.asUintN(64, value);
  await writeInt32BE(w, Number(BigInt.asUintN(32, value >> 32n)));
  await writeInt32BE(w, Number(BigInt.asUintN(32, value)));
}

export function writeBigInt64BESync(w: Buffer, value: bigint): undefined {
  syncView.setBigInt64(0, value);
  w.writeSync(syncBuf8);
}

export async function writeVarInt32LE(
  w: BufWriter,
  value: number,
): Promise<undefined> {
  await w.write(encodeVarInt32LE(value, true));
}

export function writeVarInt32LESync(w: Buffer, value: number): undefined {
  w.writeSync(encodeVarInt32LE(value, false));
}

export async function writeVarInt32BE(
  w: BufWriter,
  value: number,
): Promise<undefined> {
  await w.write(encodeVarInt32BE(value, true));
}

export function writeVarInt32BESync(w: Buffer, value: number): undefined {
  w.writeSync(encodeVarInt32BE(value, false));
}

export async function writeBigVarInt64LE(
  w: BufWriter,
  value: bigint,
): Promise<undefined> {
  await w.write(encodeBigVarInt64LE(value, true));
}

export function writeBigVarInt64LESync(w: Buffer, value: bigint): undefined {
  w.writeSync(encodeBigVarInt64LE(value, false));
}

export async function writeBigVarInt64BE(
  w: BufWriter,
  value: bigint,
): Promise<undefined> {
  await w.write(encodeBigVarInt64BE(value, true));
}

export function writeBigVarInt64BESync(w: Buffer, value: bigint): undefined {
  w.writeSync(encodeBigVarInt64BE(value, false));
}
