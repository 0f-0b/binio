import { assertEquals } from "./deps/std/assert/assert_equals.ts";

import {
  encodeBigVarInt64BE,
  encodeBigVarInt64LE,
  encodeVarInt32BE,
  encodeVarInt32LE,
} from "./varint.ts";

Deno.test("encodeVarInt32LE", { permissions: "none" }, () => {
  assertEquals(encodeVarInt32LE(0x0, false), Uint8Array.of(0x00));
  assertEquals(encodeVarInt32LE(0x1, false), Uint8Array.of(0x01));
  assertEquals(encodeVarInt32LE(0x7f, false), Uint8Array.of(0x7f));
  assertEquals(encodeVarInt32LE(0x80, false), Uint8Array.of(0x80, 0x01));
  assertEquals(encodeVarInt32LE(0x3fff, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeVarInt32LE(0x4000, false),
    Uint8Array.of(0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeVarInt32LE(0x1fffff, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarInt32LE(0x200000, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeVarInt32LE(0xfffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarInt32LE(0x10000000, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeVarInt32LE(0xffffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x0f),
  );
});

Deno.test("encodeVarInt32BE", { permissions: "none" }, () => {
  assertEquals(encodeVarInt32BE(0x0, false), Uint8Array.of(0x00));
  assertEquals(encodeVarInt32BE(0x1, false), Uint8Array.of(0x01));
  assertEquals(encodeVarInt32BE(0x7f, false), Uint8Array.of(0x7f));
  assertEquals(encodeVarInt32BE(0x80, false), Uint8Array.of(0x81, 0x00));
  assertEquals(encodeVarInt32BE(0x3fff, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeVarInt32BE(0x4000, false),
    Uint8Array.of(0x81, 0x80, 0x00),
  );
  assertEquals(
    encodeVarInt32BE(0x1fffff, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarInt32BE(0x200000, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeVarInt32BE(0xfffffff, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeVarInt32BE(0x10000000, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeVarInt32BE(0xffffffff, false),
    Uint8Array.of(0x8f, 0xff, 0xff, 0xff, 0x7f),
  );
});

Deno.test("encodeBigVarInt64LE", { permissions: "none" }, () => {
  assertEquals(encodeBigVarInt64LE(0x0n, false), Uint8Array.of(0x00));
  assertEquals(encodeBigVarInt64LE(0x1n, false), Uint8Array.of(0x01));
  assertEquals(encodeBigVarInt64LE(0x7fn, false), Uint8Array.of(0x7f));
  assertEquals(encodeBigVarInt64LE(0x80n, false), Uint8Array.of(0x80, 0x01));
  assertEquals(encodeBigVarInt64LE(0x3fffn, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeBigVarInt64LE(0x4000n, false),
    Uint8Array.of(0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0x1fffffn, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x200000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0xfffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x10000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0x7ffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x800000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0x3ffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x40000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0x1ffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x2000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0xffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x100000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0x7fffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64LE(0x8000000000000000n, false),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertEquals(
    encodeBigVarInt64LE(0xffffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x01),
  );
});

Deno.test("encodeBigVarInt64BE", { permissions: "none" }, () => {
  assertEquals(encodeBigVarInt64BE(0x0n, false), Uint8Array.of(0x00));
  assertEquals(encodeBigVarInt64BE(0x1n, false), Uint8Array.of(0x01));
  assertEquals(encodeBigVarInt64BE(0x7fn, false), Uint8Array.of(0x7f));
  assertEquals(encodeBigVarInt64BE(0x80n, false), Uint8Array.of(0x81, 0x00));
  assertEquals(encodeBigVarInt64BE(0x3fffn, false), Uint8Array.of(0xff, 0x7f));
  assertEquals(
    encodeBigVarInt64BE(0x4000n, false),
    Uint8Array.of(0x81, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0x1fffffn, false),
    Uint8Array.of(0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64BE(0x200000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0xfffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64BE(0x10000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0x7ffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64BE(0x800000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0x3ffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64BE(0x40000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0x1ffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64BE(0x2000000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0xffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64BE(0x100000000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0x7fffffffffffffffn, false),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertEquals(
    encodeBigVarInt64BE(0x8000000000000000n, false),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertEquals(
    encodeBigVarInt64BE(0xffffffffffffffffn, false),
    Uint8Array.of(0x81, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
});
