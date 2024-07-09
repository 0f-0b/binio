import { assertEquals } from "@std/assert/equals";

import {
  encodeBigVarInt64LE,
  encodeBigVarUint64BE,
  encodeBigVarUint64LE,
  encodeVarInt32LE,
  encodeVarUint32BE,
  encodeVarUint32LE,
} from "./encode_varint.ts";

Deno.test("encodeVarInt32LE", { permissions: "none" }, () => {
  assertEquals(encodeVarInt32LE(0x0, false), Uint8Array.of(0x00));
  assertEquals(encodeVarInt32LE(0x1, false), Uint8Array.of(0x01));
  assertEquals(encodeVarInt32LE(0x3f, false), Uint8Array.of(0x3f));
  assertEquals(encodeVarInt32LE(-0x40, false), Uint8Array.of(0x40));
  assertEquals(encodeVarInt32LE(-0x1, false), Uint8Array.of(0x7f));
  assertEquals(encodeVarInt32LE(0x40, false), Uint8Array.of(0xc0, 0x00));
  assertEquals(encodeVarInt32LE(0x1fff, false), Uint8Array.of(0xff, 0x3f));
  assertEquals(encodeVarInt32LE(-0x2000, false), Uint8Array.of(0x80, 0x40));
  assertEquals(encodeVarInt32LE(-0x41, false), Uint8Array.of(0xbf, 0x7f));
  assertEquals(
    encodeVarInt32LE(0x2000, false),
    Uint8Array.of(0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeVarInt32LE(0xfffff, false),
    Uint8Array.of(0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeVarInt32LE(-0x100000, false),
    Uint8Array.of(0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeVarInt32LE(-0x2001, false),
    Uint8Array.of(0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeVarInt32LE(0x100000, false),
    Uint8Array.of(0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeVarInt32LE(0x7ffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeVarInt32LE(-0x8000000, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeVarInt32LE(-0x100001, false),
    Uint8Array.of(0xff, 0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeVarInt32LE(0x8000000, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeVarInt32LE(0x7fffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x07),
  );
  assertEquals(
    encodeVarInt32LE(-0x80000000, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x78),
  );
  assertEquals(
    encodeVarInt32LE(-0x8000001, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
});

Deno.test("encodeVarUint32LE", { permissions: "none" }, () => {
  assertEquals(encodeVarUint32LE(0x0, false), Uint8Array.of(0x00));
  assertEquals(encodeVarUint32LE(0x1, false), Uint8Array.of(0x01));
  assertEquals(encodeVarUint32LE(0x7f, false), Uint8Array.of(0x7f));
  assertEquals(encodeVarUint32LE(0x80, false), Uint8Array.of(0x80, 0x01));
  assertEquals(encodeVarUint32LE(0x3fff, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeVarUint32LE(0x4000, false),
    Uint8Array.of(0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeVarUint32LE(0x1fffff, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarUint32LE(0x200000, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeVarUint32LE(0xfffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarUint32LE(0x10000000, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeVarUint32LE(0xffffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x0f),
  );
});

Deno.test("encodeVarUint32BE", { permissions: "none" }, () => {
  assertEquals(encodeVarUint32BE(0x0, false), Uint8Array.of(0x00));
  assertEquals(encodeVarUint32BE(0x1, false), Uint8Array.of(0x01));
  assertEquals(encodeVarUint32BE(0x7f, false), Uint8Array.of(0x7f));
  assertEquals(encodeVarUint32BE(0x80, false), Uint8Array.of(0x81, 0x00));
  assertEquals(encodeVarUint32BE(0x3fff, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeVarUint32BE(0x4000, false),
    Uint8Array.of(0x81, 0x80, 0x00),
  );
  assertEquals(
    encodeVarUint32BE(0x1fffff, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarUint32BE(0x200000, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeVarUint32BE(0xfffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarUint32BE(0x10000000, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeVarUint32BE(0xffffffff, false),
    Uint8Array.of(0x8f, 0xff, 0xff, 0xff, 0x7f),
  );
});

Deno.test("encodeBigVarInt64LE", { permissions: "none" }, () => {
  assertEquals(encodeBigVarInt64LE(0x0n, false), Uint8Array.of(0x00));
  assertEquals(encodeBigVarInt64LE(0x1n, false), Uint8Array.of(0x01));
  assertEquals(encodeBigVarInt64LE(0x3fn, false), Uint8Array.of(0x3f));
  assertEquals(encodeBigVarInt64LE(-0x40n, false), Uint8Array.of(0x40));
  assertEquals(encodeBigVarInt64LE(-0x1n, false), Uint8Array.of(0x7f));
  assertEquals(encodeBigVarInt64LE(0x40n, false), Uint8Array.of(0xc0, 0x00));
  assertEquals(encodeBigVarInt64LE(0x1fffn, false), Uint8Array.of(0xff, 0x3f));
  assertEquals(encodeBigVarInt64LE(-0x2000n, false), Uint8Array.of(0x80, 0x40));
  assertEquals(encodeBigVarInt64LE(-0x41n, false), Uint8Array.of(0xbf, 0x7f));
  assertEquals(
    encodeBigVarInt64LE(0x2000n, false),
    Uint8Array.of(0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0xfffffn, false),
    Uint8Array.of(0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x100000n, false),
    Uint8Array.of(0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x2001n, false),
    Uint8Array.of(0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x100000n, false),
    Uint8Array.of(0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0x7ffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x8000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x100001n, false),
    Uint8Array.of(0xff, 0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x8000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0x3ffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x400000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x8000001n, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x400000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0x1ffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x20000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x400000001n, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x20000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0xffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x1000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x20000000001n, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x1000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0x7fffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x80000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x1000000000001n, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x80000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0x3fffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x4000000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x80000000000001n, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x4000000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(0x7fffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x8000000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(-0x4000000000000001n, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
});

Deno.test("encodeBigVarUint64LE", { permissions: "none" }, () => {
  assertEquals(encodeBigVarUint64LE(0x0n, false), Uint8Array.of(0x00));
  assertEquals(encodeBigVarUint64LE(0x1n, false), Uint8Array.of(0x01));
  assertEquals(encodeBigVarUint64LE(0x7fn, false), Uint8Array.of(0x7f));
  assertEquals(encodeBigVarUint64LE(0x80n, false), Uint8Array.of(0x80, 0x01));
  assertEquals(encodeBigVarUint64LE(0x3fffn, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeBigVarUint64LE(0x4000n, false),
    Uint8Array.of(0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0x1fffffn, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64LE(0x200000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0xfffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64LE(0x10000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0x7ffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64LE(0x800000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0x3ffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64LE(0x40000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0x1ffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64LE(0x2000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0xffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64LE(0x100000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0x7fffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64LE(0x8000000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarUint64LE(0xffffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x01),
  );
});

Deno.test("encodeBigVarUint64BE", { permissions: "none" }, () => {
  assertEquals(encodeBigVarUint64BE(0x0n, false), Uint8Array.of(0x00));
  assertEquals(encodeBigVarUint64BE(0x1n, false), Uint8Array.of(0x01));
  assertEquals(encodeBigVarUint64BE(0x7fn, false), Uint8Array.of(0x7f));
  assertEquals(encodeBigVarUint64BE(0x80n, false), Uint8Array.of(0x81, 0x00));
  assertEquals(encodeBigVarUint64BE(0x3fffn, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeBigVarUint64BE(0x4000n, false),
    Uint8Array.of(0x81, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0x1fffffn, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64BE(0x200000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0xfffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64BE(0x10000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0x7ffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64BE(0x800000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0x3ffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64BE(0x40000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0x1ffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64BE(0x2000000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0xffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64BE(0x100000000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0x7fffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarUint64BE(0x8000000000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarUint64BE(0xffffffffffffffffn, false),
    Uint8Array.of(0x81, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
});
