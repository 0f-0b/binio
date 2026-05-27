import assert from "node:assert/strict";

import {
  readBigInt64BE,
  readBigInt64BESync,
  readBigInt64LE,
  readBigInt64LESync,
  readBigUint64BE,
  readBigUint64BESync,
  readBigUint64LE,
  readBigUint64LESync,
  readBigVarInt64LE,
  readBigVarInt64LESync,
  readBigVarUint64BE,
  readBigVarUint64BESync,
  readBigVarUint64LE,
  readBigVarUint64LESync,
  readFloat16BE,
  readFloat16BESync,
  readFloat16LE,
  readFloat16LESync,
  readFloat32BE,
  readFloat32BESync,
  readFloat32LE,
  readFloat32LESync,
  readFloat64BE,
  readFloat64BESync,
  readFloat64LE,
  readFloat64LESync,
  readInt16BE,
  readInt16BESync,
  readInt16LE,
  readInt16LESync,
  readInt32BE,
  readInt32BESync,
  readInt32LE,
  readInt32LESync,
  readInt8,
  readInt8Sync,
  readUint16BE,
  readUint16BESync,
  readUint16LE,
  readUint16LESync,
  readUint32BE,
  readUint32BESync,
  readUint32LE,
  readUint32LESync,
  readUint8,
  readUint8Sync,
  readVarInt32LE,
  readVarInt32LESync,
  readVarUint32BE,
  readVarUint32BESync,
  readVarUint32LE,
  readVarUint32LESync,
  writeBigInt64BE,
  writeBigInt64BESync,
  writeBigInt64LE,
  writeBigInt64LESync,
  writeBigVarInt64LE,
  writeBigVarInt64LESync,
  writeBigVarUint64BE,
  writeBigVarUint64BESync,
  writeBigVarUint64LE,
  writeBigVarUint64LESync,
  writeFloat16BE,
  writeFloat16BESync,
  writeFloat16LE,
  writeFloat16LESync,
  writeFloat32BE,
  writeFloat32BESync,
  writeFloat32LE,
  writeFloat32LESync,
  writeFloat64BE,
  writeFloat64BESync,
  writeFloat64LE,
  writeFloat64LESync,
  writeInt16BE,
  writeInt16BESync,
  writeInt16LE,
  writeInt16LESync,
  writeInt32BE,
  writeInt32BESync,
  writeInt32LE,
  writeInt32LESync,
  writeInt8,
  writeInt8Sync,
  writeVarInt32LE,
  writeVarInt32LESync,
  writeVarUint32BE,
  writeVarUint32BESync,
  writeVarUint32LE,
  writeVarUint32LESync,
} from "./numeric.ts";
import { Uint8ArrayReader } from "./uint8_array_reader.ts";
import { Uint8ArrayWriter } from "./uint8_array_writer.ts";

Deno.test("readInt8", { permissions: "none" }, async () => {
  const p = new Uint8ArrayReader(Uint8Array.of(0x87));
  const r = p.asStream().getReader({ mode: "byob" });
  assert.equal(await readInt8(r), -0x79);
  assert.equal(await readInt8(r), null);
});

Deno.test("readInt8Sync", { permissions: "none" }, () => {
  const r = new Uint8ArrayReader(Uint8Array.of(0x87));
  assert.equal(readInt8Sync(r), -0x79);
  assert.equal(readInt8Sync(r), null);
});

Deno.test("readUint8", { permissions: "none" }, async () => {
  const p = new Uint8ArrayReader(Uint8Array.of(0x87));
  const r = p.asStream().getReader({ mode: "byob" });
  assert.equal(await readUint8(r), 0x87);
  assert.equal(await readUint8(r), null);
});

Deno.test("readUint8Sync", { permissions: "none" }, () => {
  const r = new Uint8ArrayReader(Uint8Array.of(0x87));
  assert.equal(readUint8Sync(r), 0x87);
  assert.equal(readUint8Sync(r), null);
});

Deno.test("readInt16LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readInt16LE(r), -0x789b);
    assert.equal(await readInt16LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readInt16LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt16LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    assert.equal(readInt16LESync(r), -0x789b);
    assert.equal(readInt16LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65));
    assert.throws(() => readInt16LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt16BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readInt16BE(r), -0x789b);
    assert.equal(await readInt16BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readInt16BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt16BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assert.equal(readInt16BESync(r), -0x789b);
    assert.equal(readInt16BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87));
    assert.throws(() => readInt16BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readUint16LE(r), 0x8765);
    assert.equal(await readUint16LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readUint16LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    assert.equal(readUint16LESync(r), 0x8765);
    assert.equal(readUint16LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65));
    assert.throws(() => readUint16LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readUint16BE(r), 0x8765);
    assert.equal(await readUint16BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readUint16BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assert.equal(readUint16BESync(r), 0x8765);
    assert.equal(readUint16BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87));
    assert.throws(() => readUint16BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readInt32LE(r), -0x789abcdf);
    assert.equal(await readInt32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readInt32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assert.equal(readInt32LESync(r), -0x789abcdf);
    assert.equal(readInt32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    assert.throws(() => readInt32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readInt32BE(r), -0x789abcdf);
    assert.equal(await readInt32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readInt32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assert.equal(readInt32BESync(r), -0x789abcdf);
    assert.equal(readInt32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assert.throws(() => readInt32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readUint32LE(r), 0x87654321);
    assert.equal(await readUint32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assert.equal(readUint32LESync(r), 0x87654321);
    assert.equal(readUint32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    assert.throws(() => readUint32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readUint32BE(r), 0x87654321);
    assert.equal(await readUint32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assert.equal(readUint32BESync(r), 0x87654321);
    assert.equal(readUint32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assert.throws(() => readUint32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readBigInt64LE(r), -0x789abcde789abcdfn);
    assert.equal(await readBigInt64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigInt64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    assert.equal(readBigInt64LESync(r), -0x789abcde789abcdfn);
    assert.equal(readBigInt64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assert.throws(() => readBigInt64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readBigInt64BE(r), -0x789abcde789abcdfn);
    assert.equal(await readBigInt64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigInt64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    assert.equal(readBigInt64BESync(r), -0x789abcde789abcdfn);
    assert.equal(readBigInt64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assert.throws(() => readBigInt64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readBigUint64LE(r), 0x8765432187654321n);
    assert.equal(await readBigUint64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigUint64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    assert.equal(readBigUint64LESync(r), 0x8765432187654321n);
    assert.equal(readBigUint64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assert.throws(() => readBigUint64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readBigUint64BE(r), 0x8765432187654321n);
    assert.equal(await readBigUint64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigUint64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    assert.equal(readBigUint64BESync(r), 0x8765432187654321n);
    assert.equal(readBigUint64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assert.throws(() => readBigUint64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarInt32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readVarInt32LE(r), -0x9abcdf);
    assert.equal(await readVarInt32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xfb, 0x80));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readVarInt32LE(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readVarInt32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarInt32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
    assert.equal(readVarInt32LESync(r), -0x9abcdf);
    assert.equal(readVarInt32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xfb, 0x80));
    assert.throws(() => readVarInt32LESync(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assert.throws(() => readVarInt32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readVarUint32LE(r), 0x87654321);
    assert.equal(await readVarUint32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x88));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readVarUint32LE(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readVarUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
    assert.equal(readVarUint32LESync(r), 0x87654321);
    assert.equal(readVarUint32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x88));
    assert.throws(() => readVarUint32LESync(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assert.throws(() => readVarUint32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readVarUint32BE(r), 0x87654321);
    assert.equal(await readVarUint32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readVarUint32BE(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x88));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readVarUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
    assert.equal(readVarUint32BESync(r), 0x87654321);
    assert.equal(readVarUint32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0xa1));
    assert.throws(() => readVarUint32BESync(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x88));
    assert.throws(() => readVarUint32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarInt64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readBigVarInt64LE(r), -0x9abcde789abcdfn);
    assert.equal(await readBigVarInt64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0xff, 0x80),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigVarInt64LE(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigVarInt64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarInt64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
    );
    assert.equal(readBigVarInt64LESync(r), -0x9abcde789abcdfn);
    assert.equal(readBigVarInt64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0xff, 0x80),
    );
    assert.throws(() => readBigVarInt64LESync(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assert.throws(() => readBigVarInt64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readBigVarUint64LE(r), 0x8765432187654321n);
    assert.equal(await readBigVarUint64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigVarUint64LE(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(
      () => readBigVarUint64LE(r),
      Deno.errors.UnexpectedEof,
    );
  }
});

Deno.test("readBigVarUint64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
    );
    assert.equal(readBigVarUint64LESync(r), 0x8765432187654321n);
    assert.equal(readBigVarUint64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81),
    );
    assert.throws(() => readBigVarUint64LESync(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assert.throws(() => readBigVarUint64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readBigVarUint64BE(r), 0x8765432187654321n);
    assert.equal(await readBigVarUint64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readBigVarUint64BE(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x81));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(
      () => readBigVarUint64BE(r),
      Deno.errors.UnexpectedEof,
    );
  }
});

Deno.test("readBigVarUint64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
    );
    assert.equal(readBigVarUint64BESync(r), 0x8765432187654321n);
    assert.equal(readBigVarUint64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1),
    );
    assert.throws(() => readBigVarUint64BESync(r), {
      constructor: TypeError,
      message: "Varint is too long",
    });
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x81));
    assert.throws(() => readBigVarUint64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat16LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x70, 0x41));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readFloat16LE(r), 2.71875);
    assert.equal(await readFloat16LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x70));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readFloat16LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat16LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x70, 0x41));
    assert.equal(readFloat16LESync(r), 2.71875);
    assert.equal(readFloat16LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x70));
    assert.throws(() => readFloat16LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat16BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x41, 0x70));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readFloat16BE(r), 2.71875);
    assert.equal(await readFloat16BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x41));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readFloat16BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat16BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x41, 0x70));
    assert.equal(readFloat16BESync(r), 2.71875);
    assert.equal(readFloat16BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x41));
    assert.throws(() => readFloat16BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readFloat32LE(r), 2.7182817459106445);
    assert.equal(await readFloat32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readFloat32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
    assert.equal(readFloat32LESync(r), 2.7182817459106445);
    assert.equal(readFloat32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8));
    assert.throws(() => readFloat32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readFloat32BE(r), 2.7182817459106445);
    assert.equal(await readFloat32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readFloat32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
    assert.equal(readFloat32BESync(r), 2.7182817459106445);
    assert.equal(readFloat32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d));
    assert.throws(() => readFloat32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readFloat64LE(r), 2.718281828459045);
    assert.equal(await readFloat64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x69, 0x57, 0x14, 0x8b));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readFloat64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
    );
    assert.equal(readFloat64LESync(r), 2.718281828459045);
    assert.equal(readFloat64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x69, 0x57, 0x14, 0x8b));
    assert.throws(() => readFloat64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readFloat64BE(r), 2.718281828459045);
    assert.equal(await readFloat64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x40, 0x05, 0xbf, 0x0a));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(() => readFloat64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
    );
    assert.equal(readFloat64BESync(r), 2.718281828459045);
    assert.equal(readFloat64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x40, 0x05, 0xbf, 0x0a));
    assert.throws(() => readFloat64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("writeInt8", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt8(w, 0x87);
  await writeInt8(w, 0x65);
  assert.deepEqual(p.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt8Sync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt8Sync(w, 0x87);
  assert.deepEqual(w.bytes, Uint8Array.of(0x87));
});

Deno.test("writeInt16LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt16LE(w, 0x8765);
  assert.deepEqual(p.bytes, Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt16LESync(w, 0x8765);
  assert.deepEqual(w.bytes, Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt16BE(w, 0x8765);
  assert.deepEqual(p.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt16BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt16BESync(w, 0x8765);
  assert.deepEqual(w.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt32LE(w, 0x87654321);
  assert.deepEqual(p.bytes, Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt32LESync(w, 0x87654321);
  assert.deepEqual(w.bytes, Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt32BE(w, 0x87654321);
  assert.deepEqual(p.bytes, Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeInt32BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt32BESync(w, 0x87654321);
  assert.deepEqual(w.bytes, Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeBigInt64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigInt64LE(w, 0x8765432187654321n);
  assert.deepEqual(
    p.bytes,
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigInt64LESync(w, 0x8765432187654321n);
  assert.deepEqual(
    w.bytes,
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigInt64BE(w, 0x8765432187654321n);
  assert.deepEqual(
    p.bytes,
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeBigInt64BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigInt64BESync(w, 0x8765432187654321n);
  assert.deepEqual(
    w.bytes,
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeVarInt32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeVarInt32LE(w, -0x9abcdf);
  assert.deepEqual(p.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
});

Deno.test("writeVarInt32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeVarInt32LESync(w, -0x9abcdf);
  assert.deepEqual(w.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
});

Deno.test("writeVarUint32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeVarUint32LE(w, 0x87654321);
  assert.deepEqual(p.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarUint32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeVarUint32LESync(w, 0x87654321);
  assert.deepEqual(w.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarUint32BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeVarUint32BE(w, 0x87654321);
  assert.deepEqual(p.bytes, Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeVarUint32BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeVarUint32BESync(w, 0x87654321);
  assert.deepEqual(w.bytes, Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeBigVarInt64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigVarInt64LE(w, -0x9abcde789abcdfn);
  assert.deepEqual(
    p.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
  );
});

Deno.test("writeBigVarInt64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigVarInt64LESync(w, -0x9abcde789abcdfn);
  assert.deepEqual(
    w.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
  );
});

Deno.test("writeBigVarUint64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigVarUint64LE(w, 0x8765432187654321n);
  assert.deepEqual(
    p.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarUint64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigVarUint64LESync(w, 0x8765432187654321n);
  assert.deepEqual(
    w.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarUint64BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigVarUint64BE(w, 0x8765432187654321n);
  assert.deepEqual(
    p.bytes,
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});

Deno.test("writeBigVarUint64BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigVarUint64BESync(w, 0x8765432187654321n);
  assert.deepEqual(
    w.bytes,
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});

Deno.test("writeFloat16LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat16LE(w, 2.71875);
  assert.deepEqual(p.bytes, Uint8Array.of(0x70, 0x41));
});

Deno.test("writeFloat16LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat16LESync(w, 2.71875);
  assert.deepEqual(w.bytes, Uint8Array.of(0x70, 0x41));
});

Deno.test("writeFloat16BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat16BE(w, 2.71875);
  assert.deepEqual(p.bytes, Uint8Array.of(0x41, 0x70));
});

Deno.test("writeFloat16BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat16BESync(w, 2.71875);
  assert.deepEqual(w.bytes, Uint8Array.of(0x41, 0x70));
});

Deno.test("writeFloat32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat32LE(w, 2.7182817459106445);
  assert.deepEqual(p.bytes, Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
});

Deno.test("writeFloat32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat32LESync(w, 2.7182817459106445);
  assert.deepEqual(w.bytes, Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
});

Deno.test("writeFloat32BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat32BE(w, 2.7182817459106445);
  assert.deepEqual(p.bytes, Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
});

Deno.test("writeFloat32BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat32BESync(w, 2.7182817459106445);
  assert.deepEqual(w.bytes, Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
});

Deno.test("writeFloat64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat64LE(w, 2.718281828459045);
  assert.deepEqual(
    p.bytes,
    Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
  );
});

Deno.test("writeFloat64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat64LESync(w, 2.718281828459045);
  assert.deepEqual(
    w.bytes,
    Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
  );
});

Deno.test("writeFloat64BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat64BE(w, 2.718281828459045);
  assert.deepEqual(
    p.bytes,
    Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
  );
});

Deno.test("writeFloat64BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat64BESync(w, 2.718281828459045);
  assert.deepEqual(
    w.bytes,
    Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
  );
});
