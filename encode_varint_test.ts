import { assertEquals } from "@std/assert/equals";
import { assertStrictEquals } from "@std/assert/strict-equals";

import {
  encodeBigVarInt64LE,
  encodeBigVarUint64BE,
  encodeBigVarUint64LE,
  encodeVarInt32LE,
  encodeVarUint32BE,
  encodeVarUint32LE,
} from "./encode_varint.ts";

const buf = new Uint8Array(10);

Deno.test("encodeVarInt32LE", { permissions: "none" }, () => {
  assertStrictEquals(encodeVarInt32LE(buf, 0x0), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x00));
  assertStrictEquals(encodeVarInt32LE(buf, 0x1), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x01));
  assertStrictEquals(encodeVarInt32LE(buf, 0x3f), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x3f));
  assertStrictEquals(encodeVarInt32LE(buf, -0x40), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x40));
  assertStrictEquals(encodeVarInt32LE(buf, -0x1), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assertStrictEquals(encodeVarInt32LE(buf, 0x40), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xc0, 0x00));
  assertStrictEquals(encodeVarInt32LE(buf, 0x1fff), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xff, 0x3f));
  assertStrictEquals(encodeVarInt32LE(buf, -0x2000), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0x80, 0x40));
  assertStrictEquals(encodeVarInt32LE(buf, -0x41), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xbf, 0x7f));
  assertStrictEquals(encodeVarInt32LE(buf, 0x2000), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x80, 0xc0, 0x00));
  assertStrictEquals(encodeVarInt32LE(buf, 0xfffff), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x3f));
  assertStrictEquals(encodeVarInt32LE(buf, -0x100000), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x40));
  assertStrictEquals(encodeVarInt32LE(buf, -0x2001), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xbf, 0x7f));
  assertStrictEquals(encodeVarInt32LE(buf, 0x100000), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0xc0, 0x00));
  assertStrictEquals(encodeVarInt32LE(buf, 0x7ffffff), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x3f));
  assertStrictEquals(encodeVarInt32LE(buf, -0x8000000), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x40));
  assertStrictEquals(encodeVarInt32LE(buf, -0x100001), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xbf, 0x7f));
  assertStrictEquals(encodeVarInt32LE(buf, 0x8000000), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x80, 0x80, 0x80, 0xc0, 0x00));
  assertStrictEquals(encodeVarInt32LE(buf, 0x7fffffff), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x07));
  assertStrictEquals(encodeVarInt32LE(buf, -0x80000000), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x78));
  assertStrictEquals(encodeVarInt32LE(buf, -0x8000001), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0xff, 0xff, 0xff, 0xbf, 0x7f));
});

Deno.test("encodeVarUint32LE", { permissions: "none" }, () => {
  assertStrictEquals(encodeVarUint32LE(buf, 0x0), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x00));
  assertStrictEquals(encodeVarUint32LE(buf, 0x1), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x01));
  assertStrictEquals(encodeVarUint32LE(buf, 0x7f), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assertStrictEquals(encodeVarUint32LE(buf, 0x80), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0x80, 0x01));
  assertStrictEquals(encodeVarUint32LE(buf, 0x3fff), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assertStrictEquals(encodeVarUint32LE(buf, 0x4000), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x01));
  assertStrictEquals(encodeVarUint32LE(buf, 0x1fffff), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assertStrictEquals(encodeVarUint32LE(buf, 0x200000), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x01));
  assertStrictEquals(encodeVarUint32LE(buf, 0xfffffff), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assertStrictEquals(encodeVarUint32LE(buf, 0x10000000), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01));
  assertStrictEquals(encodeVarUint32LE(buf, 0xffffffff), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x0f));
});

Deno.test("encodeVarUint32BE", { permissions: "none" }, () => {
  assertStrictEquals(encodeVarUint32BE(buf, 0x0), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x00));
  assertStrictEquals(encodeVarUint32BE(buf, 0x1), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x01));
  assertStrictEquals(encodeVarUint32BE(buf, 0x7f), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assertStrictEquals(encodeVarUint32BE(buf, 0x80), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0x81, 0x00));
  assertStrictEquals(encodeVarUint32BE(buf, 0x3fff), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assertStrictEquals(encodeVarUint32BE(buf, 0x4000), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x81, 0x80, 0x00));
  assertStrictEquals(encodeVarUint32BE(buf, 0x1fffff), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assertStrictEquals(encodeVarUint32BE(buf, 0x200000), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x81, 0x80, 0x80, 0x00));
  assertStrictEquals(encodeVarUint32BE(buf, 0xfffffff), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assertStrictEquals(encodeVarUint32BE(buf, 0x10000000), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00));
  assertStrictEquals(encodeVarUint32BE(buf, 0xffffffff), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x8f, 0xff, 0xff, 0xff, 0x7f));
});

Deno.test("encodeBigVarInt64LE", { permissions: "none" }, () => {
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x0n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x00));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x1n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x01));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x3fn), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x3f));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x40n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x40));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x1n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x40n), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xc0, 0x00));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x1fffn), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xff, 0x3f));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x2000n), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0x80, 0x40));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x41n), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xbf, 0x7f));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x2000n), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x80, 0xc0, 0x00));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0xfffffn), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x3f));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x100000n), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x40));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x2001n), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xbf, 0x7f));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x100000n), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0xc0, 0x00));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x7ffffffn), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x3f));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x8000000n), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x40));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x100001n), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xbf, 0x7f));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x8000000n), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x80, 0x80, 0x80, 0xc0, 0x00));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x3ffffffffn), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x3f));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x400000000n), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x40));
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x8000001n), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0xff, 0xff, 0xff, 0xbf, 0x7f));
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x400000000n), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x1ffffffffffn), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x20000000000n), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x400000001n), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x20000000000n), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0xffffffffffffn), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x1000000000000n), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x20000000001n), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x1000000000000n), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x7fffffffffffffn), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x80000000000000n), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x1000000000001n), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x80000000000000n), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x3fffffffffffffffn), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x4000000000000000n), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x80000000000001n), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x4000000000000000n), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, 0x7fffffffffffffffn), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x8000000000000000n), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x7f),
  );
  assertStrictEquals(encodeBigVarInt64LE(buf, -0x4000000000000001n), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
});

Deno.test("encodeBigVarUint64LE", { permissions: "none" }, () => {
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x0n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x00));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x1n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x01));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x7fn), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x80n), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0x80, 0x01));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x3fffn), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x4000n), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x01));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x1fffffn), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x200000n), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x01));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0xfffffffn), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x10000000n), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x7ffffffffn), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x800000000n), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x3ffffffffffn), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x40000000000n), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x1ffffffffffffn), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x2000000000000n), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0xffffffffffffffn), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x100000000000000n), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x7fffffffffffffffn), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0x8000000000000000n), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assertStrictEquals(encodeBigVarUint64LE(buf, 0xffffffffffffffffn), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x01),
  );
});

Deno.test("encodeBigVarUint64BE", { permissions: "none" }, () => {
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x0n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x00));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x1n), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x01));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x7fn), 1);
  assertEquals(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x80n), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0x81, 0x00));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x3fffn), 2);
  assertEquals(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x4000n), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0x81, 0x80, 0x00));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x1fffffn), 3);
  assertEquals(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x200000n), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0x81, 0x80, 0x80, 0x00));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0xfffffffn), 4);
  assertEquals(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x10000000n), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x7ffffffffn), 5);
  assertEquals(buf.subarray(0, 5), Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f));
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x800000000n), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x3ffffffffffn), 6);
  assertEquals(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x40000000000n), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x1ffffffffffffn), 7);
  assertEquals(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x2000000000000n), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0xffffffffffffffn), 8);
  assertEquals(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x100000000000000n), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x7fffffffffffffffn), 9);
  assertEquals(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0x8000000000000000n), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assertStrictEquals(encodeBigVarUint64BE(buf, 0xffffffffffffffffn), 10);
  assertEquals(
    buf.subarray(0, 10),
    Uint8Array.of(0x81, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
});
