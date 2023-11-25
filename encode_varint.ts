const { BigInt, Math, Number, Uint8Array } = globalThis;
const { asUintN } = BigInt;
const { clz32 } = Math;

function lengthOfVarInt32(value: number): number {
  return ((31 - clz32(value)) / 7) | 0;
}

function lengthOfBigVarInt64(value: bigint): number {
  switch (0n) {
    case value >> 7n:
      return 0;
    case value >> 14n:
      return 1;
    case value >> 21n:
      return 2;
    case value >> 28n:
      return 3;
    case value >> 35n:
      return 4;
    case value >> 42n:
      return 5;
    case value >> 49n:
      return 6;
    case value >> 56n:
      return 7;
    case value >> 63n:
      return 8;
    default:
      return 9;
  }
}

const syncBuf = new Uint8Array(10);

export function encodeVarInt32LE(value: number, copy: boolean): Uint8Array {
  value >>>= 0;
  const len = lengthOfVarInt32(value);
  for (let i = 0; i < len; i++) {
    syncBuf[i] = (value & 0x7f) | 0x80;
    value >>>= 7;
  }
  syncBuf[len] = value & 0x7f;
  return copy ? syncBuf.slice(0, len + 1) : syncBuf.subarray(0, len + 1);
}

export function encodeVarInt32BE(value: number, copy: boolean): Uint8Array {
  value >>>= 0;
  const len = lengthOfVarInt32(value);
  syncBuf[len] = value & 0x7f;
  for (let i = len; i--;) {
    value >>>= 7;
    syncBuf[i] = (value & 0x7f) | 0x80;
  }
  return copy ? syncBuf.slice(0, len + 1) : syncBuf.subarray(0, len + 1);
}

export function encodeBigVarInt64LE(value: bigint, copy: boolean): Uint8Array {
  value = asUintN(64, value);
  const len = lengthOfBigVarInt64(value);
  for (let i = 0; i < len; i++) {
    syncBuf[i] = Number(value & 0x7fn) | 0x80;
    value >>= 7n;
  }
  syncBuf[len] = Number(value & 0x7fn);
  return copy ? syncBuf.slice(0, len + 1) : syncBuf.subarray(0, len + 1);
}

export function encodeBigVarInt64BE(value: bigint, copy: boolean): Uint8Array {
  value = asUintN(64, value);
  const len = lengthOfBigVarInt64(value);
  syncBuf[len] = Number(value & 0x7fn);
  for (let i = len; i--;) {
    value >>= 7n;
    syncBuf[i] = Number(value & 0x7fn) | 0x80;
  }
  return copy ? syncBuf.slice(0, len + 1) : syncBuf.subarray(0, len + 1);
}
