import { BufferReader } from "./buffer_reader.ts";
import { BufferWriter } from "./buffer_writer.ts";
import {
  encodeBigVarInt64BE,
  encodeBigVarInt64LE,
  encodeVarInt32BE,
  encodeVarInt32LE,
} from "./encode_varint.ts";
import { readFull, readFullSync } from "./read_full.ts";
import { unexpectedEof } from "./unexpected_eof.ts";

const syncBuf8 = new Uint8Array(8);
const syncBuf4 = syncBuf8.subarray(0, 4);
const syncBuf2 = syncBuf8.subarray(0, 2);
const syncBuf1 = syncBuf8.subarray(0, 1);
const syncView = new DataView(syncBuf8.buffer);

export async function readUint8(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(1));
  return buf && new DataView(buf.buffer).getUint8(0);
}

export function readUint8Sync(r: BufferReader): number | null {
  return readFullSync(r, syncBuf1) && syncView.getUint8(0);
}

export async function readUint16LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(2));
  return buf && new DataView(buf.buffer).getUint16(0, true);
}

export function readUint16LESync(r: BufferReader): number | null {
  return readFullSync(r, syncBuf2) && syncView.getUint16(0, true);
}

export async function readUint16BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(2));
  return buf && new DataView(buf.buffer).getUint16(0);
}

export function readUint16BESync(r: BufferReader): number | null {
  return readFullSync(r, syncBuf2) && syncView.getUint16(0);
}

export async function readUint32LE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getUint32(0, true);
}

export function readUint32LESync(r: BufferReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getUint32(0, true);
}

export async function readUint32BE(
  r: ReadableStreamBYOBReader,
): Promise<number | null> {
  const buf = await readFull(r, new Uint8Array(4));
  return buf && new DataView(buf.buffer).getUint32(0);
}

export function readUint32BESync(r: BufferReader): number | null {
  return readFullSync(r, syncBuf4) && syncView.getUint32(0);
}

export async function readBigUint64LE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getBigUint64(0, true);
}

export function readBigUint64LESync(r: BufferReader): bigint | null {
  return readFullSync(r, syncBuf8) && syncView.getBigUint64(0, true);
}

export async function readBigUint64BE(
  r: ReadableStreamBYOBReader,
): Promise<bigint | null> {
  const buf = await readFull(r, new Uint8Array(8));
  return buf && new DataView(buf.buffer).getBigUint64(0);
}

export function readBigUint64BESync(r: BufferReader): bigint | null {
  return readFullSync(r, syncBuf8) && syncView.getBigUint64(0);
}

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

export function readVarUint32LESync(r: BufferReader): number | null {
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

export function readVarUint32BESync(r: BufferReader): number | null {
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

export function readBigVarUint64LESync(r: BufferReader): bigint | null {
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

export function readBigVarUint64BESync(r: BufferReader): bigint | null {
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
  w: WritableStreamDefaultWriter,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(1);
  new DataView(buf.buffer).setInt8(0, value);
  await w.write(buf);
}

export function writeInt8Sync(w: BufferWriter, value: number): undefined {
  syncView.setInt8(0, value);
  w.write(syncBuf1);
}

export async function writeInt16LE(
  w: WritableStreamDefaultWriter,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(2);
  new DataView(buf.buffer).setInt16(0, value, true);
  await w.write(buf);
}

export function writeInt16LESync(w: BufferWriter, value: number): undefined {
  syncView.setInt16(0, value, true);
  w.write(syncBuf2);
}

export async function writeInt16BE(
  w: WritableStreamDefaultWriter,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(2);
  new DataView(buf.buffer).setInt16(0, value);
  await w.write(buf);
}

export function writeInt16BESync(w: BufferWriter, value: number): undefined {
  syncView.setInt16(0, value);
  w.write(syncBuf2);
}

export async function writeInt32LE(
  w: WritableStreamDefaultWriter,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(4);
  new DataView(buf.buffer).setInt32(0, value, true);
  await w.write(buf);
}

export function writeInt32LESync(w: BufferWriter, value: number): undefined {
  syncView.setInt32(0, value, true);
  w.write(syncBuf4);
}

export async function writeInt32BE(
  w: WritableStreamDefaultWriter,
  value: number,
): Promise<undefined> {
  const buf = new Uint8Array(4);
  new DataView(buf.buffer).setInt32(0, value);
  await w.write(buf);
}

export function writeInt32BESync(w: BufferWriter, value: number): undefined {
  syncView.setInt32(0, value);
  w.write(syncBuf4);
}

export async function writeBigInt64LE(
  w: WritableStreamDefaultWriter,
  value: bigint,
): Promise<undefined> {
  const buf = new Uint8Array(8);
  new DataView(buf.buffer).setBigInt64(0, value, true);
  await w.write(buf);
}

export function writeBigInt64LESync(w: BufferWriter, value: bigint): undefined {
  syncView.setBigInt64(0, value, true);
  w.write(syncBuf8);
}

export async function writeBigInt64BE(
  w: WritableStreamDefaultWriter,
  value: bigint,
): Promise<undefined> {
  const buf = new Uint8Array(8);
  new DataView(buf.buffer).setBigInt64(0, value);
  await w.write(buf);
}

export function writeBigInt64BESync(w: BufferWriter, value: bigint): undefined {
  syncView.setBigInt64(0, value);
  w.write(syncBuf8);
}

export async function writeVarInt32LE(
  w: WritableStreamDefaultWriter,
  value: number,
): Promise<undefined> {
  await w.write(encodeVarInt32LE(value, true));
}

export function writeVarInt32LESync(w: BufferWriter, value: number): undefined {
  w.write(encodeVarInt32LE(value, false));
}

export async function writeVarInt32BE(
  w: WritableStreamDefaultWriter,
  value: number,
): Promise<undefined> {
  await w.write(encodeVarInt32BE(value, true));
}

export function writeVarInt32BESync(w: BufferWriter, value: number): undefined {
  w.write(encodeVarInt32BE(value, false));
}

export async function writeBigVarInt64LE(
  w: WritableStreamDefaultWriter,
  value: bigint,
): Promise<undefined> {
  await w.write(encodeBigVarInt64LE(value, true));
}

export function writeBigVarInt64LESync(
  w: BufferWriter,
  value: bigint,
): undefined {
  w.write(encodeBigVarInt64LE(value, false));
}

export async function writeBigVarInt64BE(
  w: WritableStreamDefaultWriter,
  value: bigint,
): Promise<undefined> {
  await w.write(encodeBigVarInt64BE(value, true));
}

export function writeBigVarInt64BESync(
  w: BufferWriter,
  value: bigint,
): undefined {
  w.write(encodeBigVarInt64BE(value, false));
}
