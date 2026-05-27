import assert from "node:assert/strict";

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
  assert.equal(encodeVarInt32LE(buf, 0x0), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x00));
  assert.equal(encodeVarInt32LE(buf, 0x1), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x01));
  assert.equal(encodeVarInt32LE(buf, 0x3f), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x3f));
  assert.equal(encodeVarInt32LE(buf, -0x40), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x40));
  assert.equal(encodeVarInt32LE(buf, -0x1), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assert.equal(encodeVarInt32LE(buf, 0x40), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xc0, 0x00));
  assert.equal(encodeVarInt32LE(buf, 0x1fff), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xff, 0x3f));
  assert.equal(encodeVarInt32LE(buf, -0x2000), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0x80, 0x40));
  assert.equal(encodeVarInt32LE(buf, -0x41), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xbf, 0x7f));
  assert.equal(encodeVarInt32LE(buf, 0x2000), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x80, 0xc0, 0x00));
  assert.equal(encodeVarInt32LE(buf, 0xfffff), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x3f));
  assert.equal(encodeVarInt32LE(buf, -0x100000), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x40));
  assert.equal(encodeVarInt32LE(buf, -0x2001), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xbf, 0x7f));
  assert.equal(encodeVarInt32LE(buf, 0x100000), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0xc0, 0x00));
  assert.equal(encodeVarInt32LE(buf, 0x7ffffff), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x3f));
  assert.equal(encodeVarInt32LE(buf, -0x8000000), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x40));
  assert.equal(encodeVarInt32LE(buf, -0x100001), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xbf, 0x7f));
  assert.equal(encodeVarInt32LE(buf, 0x8000000), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assert.equal(encodeVarInt32LE(buf, 0x7fffffff), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x07),
  );
  assert.equal(encodeVarInt32LE(buf, -0x80000000), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x78),
  );
  assert.equal(encodeVarInt32LE(buf, -0x8000001), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
});

Deno.test("encodeVarUint32LE", { permissions: "none" }, () => {
  assert.equal(encodeVarUint32LE(buf, 0x0), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x00));
  assert.equal(encodeVarUint32LE(buf, 0x1), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x01));
  assert.equal(encodeVarUint32LE(buf, 0x7f), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assert.equal(encodeVarUint32LE(buf, 0x80), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0x80, 0x01));
  assert.equal(encodeVarUint32LE(buf, 0x3fff), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assert.equal(encodeVarUint32LE(buf, 0x4000), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x01));
  assert.equal(encodeVarUint32LE(buf, 0x1fffff), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assert.equal(encodeVarUint32LE(buf, 0x200000), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x01));
  assert.equal(encodeVarUint32LE(buf, 0xfffffff), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assert.equal(encodeVarUint32LE(buf, 0x10000000), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assert.equal(encodeVarUint32LE(buf, 0xffffffff), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x0f),
  );
});

Deno.test("encodeVarUint32BE", { permissions: "none" }, () => {
  assert.equal(encodeVarUint32BE(buf, 0x0), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x00));
  assert.equal(encodeVarUint32BE(buf, 0x1), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x01));
  assert.equal(encodeVarUint32BE(buf, 0x7f), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assert.equal(encodeVarUint32BE(buf, 0x80), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0x81, 0x00));
  assert.equal(encodeVarUint32BE(buf, 0x3fff), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assert.equal(encodeVarUint32BE(buf, 0x4000), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x81, 0x80, 0x00));
  assert.equal(encodeVarUint32BE(buf, 0x1fffff), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assert.equal(encodeVarUint32BE(buf, 0x200000), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x81, 0x80, 0x80, 0x00));
  assert.equal(encodeVarUint32BE(buf, 0xfffffff), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assert.equal(encodeVarUint32BE(buf, 0x10000000), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00),
  );
  assert.equal(encodeVarUint32BE(buf, 0xffffffff), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x8f, 0xff, 0xff, 0xff, 0x7f),
  );
});

Deno.test("encodeBigVarInt64LE", { permissions: "none" }, () => {
  assert.equal(encodeBigVarInt64LE(buf, 0x0n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x00));
  assert.equal(encodeBigVarInt64LE(buf, 0x1n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x01));
  assert.equal(encodeBigVarInt64LE(buf, 0x3fn), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x3f));
  assert.equal(encodeBigVarInt64LE(buf, -0x40n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x40));
  assert.equal(encodeBigVarInt64LE(buf, -0x1n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assert.equal(encodeBigVarInt64LE(buf, 0x40n), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xc0, 0x00));
  assert.equal(encodeBigVarInt64LE(buf, 0x1fffn), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xff, 0x3f));
  assert.equal(encodeBigVarInt64LE(buf, -0x2000n), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0x80, 0x40));
  assert.equal(encodeBigVarInt64LE(buf, -0x41n), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xbf, 0x7f));
  assert.equal(encodeBigVarInt64LE(buf, 0x2000n), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x80, 0xc0, 0x00));
  assert.equal(encodeBigVarInt64LE(buf, 0xfffffn), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x3f));
  assert.equal(encodeBigVarInt64LE(buf, -0x100000n), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x40));
  assert.equal(encodeBigVarInt64LE(buf, -0x2001n), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xbf, 0x7f));
  assert.equal(encodeBigVarInt64LE(buf, 0x100000n), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0xc0, 0x00));
  assert.equal(encodeBigVarInt64LE(buf, 0x7ffffffn), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x3f));
  assert.equal(encodeBigVarInt64LE(buf, -0x8000000n), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x40));
  assert.equal(encodeBigVarInt64LE(buf, -0x100001n), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xbf, 0x7f));
  assert.equal(encodeBigVarInt64LE(buf, 0x8000000n), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x3ffffffffn), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x400000000n), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x8000001n), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x400000000n), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x1ffffffffffn), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x20000000000n), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x400000001n), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x20000000000n), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0xffffffffffffn), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x1000000000000n), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x20000000001n), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x1000000000000n), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x7fffffffffffffn), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x80000000000000n), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x1000000000001n), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x80000000000000n), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x3fffffffffffffffn), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x3f),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x4000000000000000n), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x40),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x80000000000001n), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x4000000000000000n), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xc0, 0x00),
  );
  assert.equal(encodeBigVarInt64LE(buf, 0x7fffffffffffffffn), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x8000000000000000n), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x7f),
  );
  assert.equal(encodeBigVarInt64LE(buf, -0x4000000000000001n), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xbf, 0x7f),
  );
});

Deno.test("encodeBigVarUint64LE", { permissions: "none" }, () => {
  assert.equal(encodeBigVarUint64LE(buf, 0x0n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x00));
  assert.equal(encodeBigVarUint64LE(buf, 0x1n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x01));
  assert.equal(encodeBigVarUint64LE(buf, 0x7fn), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assert.equal(encodeBigVarUint64LE(buf, 0x80n), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0x80, 0x01));
  assert.equal(encodeBigVarUint64LE(buf, 0x3fffn), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assert.equal(encodeBigVarUint64LE(buf, 0x4000n), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x80, 0x80, 0x01));
  assert.equal(encodeBigVarUint64LE(buf, 0x1fffffn), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assert.equal(encodeBigVarUint64LE(buf, 0x200000n), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x80, 0x80, 0x80, 0x01));
  assert.equal(encodeBigVarUint64LE(buf, 0xfffffffn), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assert.equal(encodeBigVarUint64LE(buf, 0x10000000n), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x7ffffffffn), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x800000000n), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x3ffffffffffn), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x40000000000n), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x1ffffffffffffn), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x2000000000000n), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0xffffffffffffffn), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x100000000000000n), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x7fffffffffffffffn), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0x8000000000000000n), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x01),
  );
  assert.equal(encodeBigVarUint64LE(buf, 0xffffffffffffffffn), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x01),
  );
});

Deno.test("encodeBigVarUint64BE", { permissions: "none" }, () => {
  assert.equal(encodeBigVarUint64BE(buf, 0x0n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x00));
  assert.equal(encodeBigVarUint64BE(buf, 0x1n), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x01));
  assert.equal(encodeBigVarUint64BE(buf, 0x7fn), 1);
  assert.deepEqual(buf.subarray(0, 1), Uint8Array.of(0x7f));
  assert.equal(encodeBigVarUint64BE(buf, 0x80n), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0x81, 0x00));
  assert.equal(encodeBigVarUint64BE(buf, 0x3fffn), 2);
  assert.deepEqual(buf.subarray(0, 2), Uint8Array.of(0xff, 0x7f));
  assert.equal(encodeBigVarUint64BE(buf, 0x4000n), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0x81, 0x80, 0x00));
  assert.equal(encodeBigVarUint64BE(buf, 0x1fffffn), 3);
  assert.deepEqual(buf.subarray(0, 3), Uint8Array.of(0xff, 0xff, 0x7f));
  assert.equal(encodeBigVarUint64BE(buf, 0x200000n), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0x81, 0x80, 0x80, 0x00));
  assert.equal(encodeBigVarUint64BE(buf, 0xfffffffn), 4);
  assert.deepEqual(buf.subarray(0, 4), Uint8Array.of(0xff, 0xff, 0xff, 0x7f));
  assert.equal(encodeBigVarUint64BE(buf, 0x10000000n), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x00),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x7ffffffffn), 5);
  assert.deepEqual(
    buf.subarray(0, 5),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x800000000n), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x3ffffffffffn), 6);
  assert.deepEqual(
    buf.subarray(0, 6),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x40000000000n), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x1ffffffffffffn), 7);
  assert.deepEqual(
    buf.subarray(0, 7),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x2000000000000n), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0xffffffffffffffn), 8);
  assert.deepEqual(
    buf.subarray(0, 8),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x100000000000000n), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x7fffffffffffffffn), 9);
  assert.deepEqual(
    buf.subarray(0, 9),
    Uint8Array.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0x8000000000000000n), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0x81, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x00),
  );
  assert.equal(encodeBigVarUint64BE(buf, 0xffffffffffffffffn), 10);
  assert.deepEqual(
    buf.subarray(0, 10),
    Uint8Array.of(0x81, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f),
  );
});
