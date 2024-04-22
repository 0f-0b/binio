import { assertEquals } from "@std/assert/assert-equals";
import { assertRejects } from "@std/assert/assert-rejects";
import { assertStrictEquals } from "@std/assert/assert-strict-equals";
import { assertThrows } from "@std/assert/assert-throws";

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
  assertStrictEquals(await readInt8(r), -0x79);
  assertStrictEquals(await readInt8(r), null);
});

Deno.test("readInt8Sync", { permissions: "none" }, () => {
  const r = new Uint8ArrayReader(Uint8Array.of(0x87));
  assertStrictEquals(readInt8Sync(r), -0x79);
  assertStrictEquals(readInt8Sync(r), null);
});

Deno.test("readUint8", { permissions: "none" }, async () => {
  const p = new Uint8ArrayReader(Uint8Array.of(0x87));
  const r = p.asStream().getReader({ mode: "byob" });
  assertStrictEquals(await readUint8(r), 0x87);
  assertStrictEquals(await readUint8(r), null);
});

Deno.test("readUint8Sync", { permissions: "none" }, () => {
  const r = new Uint8ArrayReader(Uint8Array.of(0x87));
  assertStrictEquals(readUint8Sync(r), 0x87);
  assertStrictEquals(readUint8Sync(r), null);
});

Deno.test("readInt16LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readInt16LE(r), -0x789b);
    assertStrictEquals(await readInt16LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readInt16LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt16LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    assertStrictEquals(readInt16LESync(r), -0x789b);
    assertStrictEquals(readInt16LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65));
    assertThrows(() => readInt16LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt16BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readInt16BE(r), -0x789b);
    assertStrictEquals(await readInt16BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readInt16BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt16BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assertStrictEquals(readInt16BESync(r), -0x789b);
    assertStrictEquals(readInt16BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87));
    assertThrows(() => readInt16BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint16LE(r), 0x8765);
    assertStrictEquals(await readUint16LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint16LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65, 0x87));
    assertStrictEquals(readUint16LESync(r), 0x8765);
    assertStrictEquals(readUint16LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x65));
    assertThrows(() => readUint16LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint16BE(r), 0x8765);
    assertStrictEquals(await readUint16BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint16BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assertStrictEquals(readUint16BESync(r), 0x8765);
    assertStrictEquals(readUint16BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87));
    assertThrows(() => readUint16BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readInt32LE(r), -0x789abcdf);
    assertStrictEquals(await readInt32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readInt32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assertStrictEquals(readInt32LESync(r), -0x789abcdf);
    assertStrictEquals(readInt32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    assertThrows(() => readInt32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readInt32BE(r), -0x789abcdf);
    assertStrictEquals(await readInt32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readInt32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readInt32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assertStrictEquals(readInt32BESync(r), -0x789abcdf);
    assertStrictEquals(readInt32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assertThrows(() => readInt32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint32LE(r), 0x87654321);
    assertStrictEquals(await readUint32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assertStrictEquals(readUint32LESync(r), 0x87654321);
    assertStrictEquals(readUint32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43));
    assertThrows(() => readUint32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint32BE(r), 0x87654321);
    assertStrictEquals(await readUint32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assertStrictEquals(readUint32BESync(r), 0x87654321);
    assertStrictEquals(readUint32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65));
    assertThrows(() => readUint32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigInt64LE(r), -0x789abcde789abcdfn);
    assertStrictEquals(await readBigInt64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigInt64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    assertStrictEquals(readBigInt64LESync(r), -0x789abcde789abcdfn);
    assertStrictEquals(readBigInt64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assertThrows(() => readBigInt64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigInt64BE(r), -0x789abcde789abcdfn);
    assertStrictEquals(await readBigInt64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigInt64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigInt64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    assertStrictEquals(readBigInt64BESync(r), -0x789abcde789abcdfn);
    assertStrictEquals(readBigInt64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assertThrows(() => readBigInt64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigUint64LE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigUint64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigUint64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    assertStrictEquals(readBigUint64LESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigUint64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assertThrows(() => readBigUint64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigUint64BE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigUint64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigUint64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    assertStrictEquals(readBigUint64BESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigUint64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assertThrows(() => readBigUint64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarInt32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readVarInt32LE(r), -0x9abcdf);
    assertStrictEquals(await readVarInt32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xfb, 0x80));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarInt32LE(r), TypeError, "too long");
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarInt32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarInt32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
    assertStrictEquals(readVarInt32LESync(r), -0x9abcdf);
    assertStrictEquals(readVarInt32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xfb, 0x80));
    assertThrows(() => readVarInt32LESync(r), TypeError, "too long");
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assertThrows(() => readVarInt32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readVarUint32LE(r), 0x87654321);
    assertStrictEquals(await readVarUint32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x88));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32LE(r), TypeError, "too long");
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
    assertStrictEquals(readVarUint32LESync(r), 0x87654321);
    assertStrictEquals(readVarUint32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x88));
    assertThrows(() => readVarUint32LESync(r), TypeError, "too long");
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assertThrows(() => readVarUint32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readVarUint32BE(r), 0x87654321);
    assertStrictEquals(await readVarUint32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32BE(r), TypeError, "too long");
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x88));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
    assertStrictEquals(readVarUint32BESync(r), 0x87654321);
    assertStrictEquals(readVarUint32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0xa1));
    assertThrows(() => readVarUint32BESync(r), TypeError, "too long");
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x88));
    assertThrows(() => readVarUint32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarInt64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigVarInt64LE(r), -0x9abcde789abcdfn);
    assertStrictEquals(await readBigVarInt64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0xff, 0x80),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarInt64LE(r), TypeError, "too long");
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarInt64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarInt64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
    );
    assertStrictEquals(readBigVarInt64LESync(r), -0x9abcde789abcdfn);
    assertStrictEquals(readBigVarInt64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0xff, 0x80),
    );
    assertThrows(() => readBigVarInt64LESync(r), TypeError, "too long");
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assertThrows(() => readBigVarInt64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigVarUint64LE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigVarUint64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64LE(r), TypeError, "too long");
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
    );
    assertStrictEquals(readBigVarUint64LESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigVarUint64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81),
    );
    assertThrows(() => readBigVarUint64LESync(r), TypeError, "too long");
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0xa1));
    assertThrows(() => readBigVarUint64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigVarUint64BE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigVarUint64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64BE(r), TypeError, "too long");
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x81));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
    );
    assertStrictEquals(readBigVarUint64BESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigVarUint64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1),
    );
    assertThrows(() => readBigVarUint64BESync(r), TypeError, "too long");
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x81));
    assertThrows(() => readBigVarUint64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readFloat32LE(r), 2.7182817459106445);
    assertStrictEquals(await readFloat32LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readFloat32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
    assertStrictEquals(readFloat32LESync(r), 2.7182817459106445);
    assertStrictEquals(readFloat32LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x54, 0xf8));
    assertThrows(() => readFloat32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readFloat32BE(r), 2.7182817459106445);
    assertStrictEquals(await readFloat32BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readFloat32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat32BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
    assertStrictEquals(readFloat32BESync(r), 2.7182817459106445);
    assertStrictEquals(readFloat32BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x40, 0x2d));
    assertThrows(() => readFloat32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64LE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readFloat64LE(r), 2.718281828459045);
    assertStrictEquals(await readFloat64LE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x69, 0x57, 0x14, 0x8b));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readFloat64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64LESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
    );
    assertStrictEquals(readFloat64LESync(r), 2.718281828459045);
    assertStrictEquals(readFloat64LESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x69, 0x57, 0x14, 0x8b));
    assertThrows(() => readFloat64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64BE", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(
      Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readFloat64BE(r), 2.718281828459045);
    assertStrictEquals(await readFloat64BE(r), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x40, 0x05, 0xbf, 0x0a));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readFloat64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readFloat64BESync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(
      Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
    );
    assertStrictEquals(readFloat64BESync(r), 2.718281828459045);
    assertStrictEquals(readFloat64BESync(r), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x40, 0x05, 0xbf, 0x0a));
    assertThrows(() => readFloat64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("writeInt8", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt8(w, 0x87);
  await writeInt8(w, 0x65);
  assertEquals(p.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt8Sync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt8Sync(w, 0x87);
  assertEquals(w.bytes, Uint8Array.of(0x87));
});

Deno.test("writeInt16LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt16LE(w, 0x8765);
  assertEquals(p.bytes, Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt16LESync(w, 0x8765);
  assertEquals(w.bytes, Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt16BE(w, 0x8765);
  assertEquals(p.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt16BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt16BESync(w, 0x8765);
  assertEquals(w.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt32LE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt32LESync(w, 0x87654321);
  assertEquals(w.bytes, Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeInt32BE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeInt32BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeInt32BESync(w, 0x87654321);
  assertEquals(w.bytes, Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeBigInt64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigInt64LE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigInt64LESync(w, 0x8765432187654321n);
  assertEquals(
    w.bytes,
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigInt64BE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeBigInt64BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigInt64BESync(w, 0x8765432187654321n);
  assertEquals(
    w.bytes,
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeVarInt32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeVarInt32LE(w, -0x9abcdf);
  assertEquals(p.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
});

Deno.test("writeVarInt32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeVarInt32LESync(w, -0x9abcdf);
  assertEquals(w.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0x7b));
});

Deno.test("writeVarUint32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeVarUint32LE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarUint32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeVarUint32LESync(w, 0x87654321);
  assertEquals(w.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarUint32BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeVarUint32BE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeVarUint32BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeVarUint32BESync(w, 0x87654321);
  assertEquals(w.bytes, Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeBigVarInt64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigVarInt64LE(w, -0x9abcde789abcdfn);
  assertEquals(
    p.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
  );
});

Deno.test("writeBigVarInt64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigVarInt64LESync(w, -0x9abcde789abcdfn);
  assertEquals(
    w.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x7f),
  );
});

Deno.test("writeBigVarUint64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigVarUint64LE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarUint64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigVarUint64LESync(w, 0x8765432187654321n);
  assertEquals(
    w.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarUint64BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeBigVarUint64BE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});

Deno.test("writeBigVarUint64BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeBigVarUint64BESync(w, 0x8765432187654321n);
  assertEquals(
    w.bytes,
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});

Deno.test("writeFloat32LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat32LE(w, 2.7182817459106445);
  assertEquals(p.bytes, Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
});

Deno.test("writeFloat32LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat32LESync(w, 2.7182817459106445);
  assertEquals(w.bytes, Uint8Array.of(0x54, 0xf8, 0x2d, 0x40));
});

Deno.test("writeFloat32BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat32BE(w, 2.7182817459106445);
  assertEquals(p.bytes, Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
});

Deno.test("writeFloat32BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat32BESync(w, 2.7182817459106445);
  assertEquals(w.bytes, Uint8Array.of(0x40, 0x2d, 0xf8, 0x54));
});

Deno.test("writeFloat64LE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat64LE(w, 2.718281828459045);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
  );
});

Deno.test("writeFloat64LESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat64LESync(w, 2.718281828459045);
  assertEquals(
    w.bytes,
    Uint8Array.of(0x69, 0x57, 0x14, 0x8b, 0x0a, 0xbf, 0x05, 0x40),
  );
});

Deno.test("writeFloat64BE", { permissions: "none" }, async () => {
  const p = new Uint8ArrayWriter();
  const w = p.asStream().getWriter();
  await writeFloat64BE(w, 2.718281828459045);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
  );
});

Deno.test("writeFloat64BESync", { permissions: "none" }, () => {
  const w = new Uint8ArrayWriter();
  writeFloat64BESync(w, 2.718281828459045);
  assertEquals(
    w.bytes,
    Uint8Array.of(0x40, 0x05, 0xbf, 0x0a, 0x8b, 0x14, 0x57, 0x69),
  );
});
