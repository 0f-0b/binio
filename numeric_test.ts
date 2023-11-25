import { assertEquals } from "./deps/std/assert/assert_equals.ts";
import { assertRejects } from "./deps/std/assert/assert_rejects.ts";
import { assertStrictEquals } from "./deps/std/assert/assert_strict_equals.ts";
import { assertThrows } from "./deps/std/assert/assert_throws.ts";

import { BufferReader } from "./buffer_reader.ts";
import { BufferWriter } from "./buffer_writer.ts";
import {
  readBigUint64BE,
  readBigUint64BESync,
  readBigUint64LE,
  readBigUint64LESync,
  readBigVarUint64BE,
  readBigVarUint64BESync,
  readBigVarUint64LE,
  readBigVarUint64LESync,
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
  readVarUint32BE,
  readVarUint32BESync,
  readVarUint32LE,
  readVarUint32LESync,
  writeBigInt64BE,
  writeBigInt64BESync,
  writeBigInt64LE,
  writeBigInt64LESync,
  writeBigVarInt64BE,
  writeBigVarInt64BESync,
  writeBigVarInt64LE,
  writeBigVarInt64LESync,
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
  writeVarInt32BE,
  writeVarInt32BESync,
  writeVarInt32LE,
  writeVarInt32LESync,
} from "./numeric.ts";

Deno.test("readUint8", { permissions: "none" }, async () => {
  const p = new BufferReader(Uint8Array.of(0x87));
  const r = p.asStream().getReader({ mode: "byob" });
  assertStrictEquals(await readUint8(r), 0x87);
  assertStrictEquals(await readUint8(r), null);
});

Deno.test("readUint8Sync", { permissions: "none" }, () => {
  const r = new BufferReader(Uint8Array.of(0x87));
  assertStrictEquals(readUint8Sync(r), 0x87);
  assertStrictEquals(readUint8Sync(r), null);
});

Deno.test("readUint16LE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(Uint8Array.of(0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint16LE(r), 0x8765);
    assertStrictEquals(await readUint16LE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint16LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16LESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(Uint8Array.of(0x65, 0x87));
    assertStrictEquals(readUint16LESync(r), 0x8765);
    assertStrictEquals(readUint16LESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x65));
    assertThrows(() => readUint16LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint16BE(r), 0x8765);
    assertStrictEquals(await readUint16BE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint16BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(Uint8Array.of(0x87, 0x65));
    assertStrictEquals(readUint16BESync(r), 0x8765);
    assertStrictEquals(readUint16BESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x87));
    assertThrows(() => readUint16BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint32LE(r), 0x87654321);
    assertStrictEquals(await readUint32LE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x21, 0x43));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assertStrictEquals(readUint32LESync(r), 0x87654321);
    assertStrictEquals(readUint32LESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x21, 0x43));
    assertThrows(() => readUint32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readUint32BE(r), 0x87654321);
    assertStrictEquals(await readUint32BE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x87, 0x65));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assertStrictEquals(readUint32BESync(r), 0x87654321);
    assertStrictEquals(readUint32BESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x87, 0x65));
    assertThrows(() => readUint32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigUint64LE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigUint64LE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigUint64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(
      Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
    );
    assertStrictEquals(readBigUint64LESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigUint64LESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x21, 0x43, 0x65, 0x87));
    assertThrows(() => readBigUint64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigUint64BE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigUint64BE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigUint64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(
      Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
    );
    assertStrictEquals(readBigUint64BESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigUint64BESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x87, 0x65, 0x43, 0x21));
    assertThrows(() => readBigUint64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readVarUint32LE(r), 0x87654321);
    assertStrictEquals(await readVarUint32LE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x88));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32LE(r), TypeError, "too long");
  }
  {
    const p = new BufferReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
    assertStrictEquals(readVarUint32LESync(r), 0x87654321);
    assertStrictEquals(readVarUint32LESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x88));
    assertThrows(() => readVarUint32LESync(r), TypeError, "too long");
  }
  {
    const r = new BufferReader(Uint8Array.of(0xa1));
    assertThrows(() => readVarUint32LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readVarUint32BE(r), 0x87654321);
    assertStrictEquals(await readVarUint32BE(r), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32BE(r), TypeError, "too long");
  }
  {
    const p = new BufferReader(Uint8Array.of(0x88));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readVarUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
    assertStrictEquals(readVarUint32BESync(r), 0x87654321);
    assertStrictEquals(readVarUint32BESync(r), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0xa1));
    assertThrows(() => readVarUint32BESync(r), TypeError, "too long");
  }
  {
    const r = new BufferReader(Uint8Array.of(0x88));
    assertThrows(() => readVarUint32BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64LE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigVarUint64LE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigVarUint64LE(r), null);
  }
  {
    const p = new BufferReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64LE(r), TypeError, "too long");
  }
  {
    const p = new BufferReader(Uint8Array.of(0xa1));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64LESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
    );
    assertStrictEquals(readBigVarUint64LESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigVarUint64LESync(r), null);
  }
  {
    const r = new BufferReader(
      Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81),
    );
    assertThrows(() => readBigVarUint64LESync(r), TypeError, "too long");
  }
  {
    const r = new BufferReader(Uint8Array.of(0xa1));
    assertThrows(() => readBigVarUint64LESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64BE", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readBigVarUint64BE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigVarUint64BE(r), null);
  }
  {
    const p = new BufferReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1),
    );
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64BE(r), TypeError, "too long");
  }
  {
    const p = new BufferReader(Uint8Array.of(0x81));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(() => readBigVarUint64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64BESync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
    );
    assertStrictEquals(readBigVarUint64BESync(r), 0x8765432187654321n);
    assertStrictEquals(readBigVarUint64BESync(r), null);
  }
  {
    const r = new BufferReader(
      Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1),
    );
    assertThrows(() => readBigVarUint64BESync(r), TypeError, "too long");
  }
  {
    const r = new BufferReader(Uint8Array.of(0x81));
    assertThrows(() => readBigVarUint64BESync(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("writeInt8", { permissions: "none" }, async () => {
  {
    const p = new BufferWriter();
    const w = p.asStream().getWriter();
    await writeInt8(w, 0x87);
    await writeInt8(w, 0x65);
    assertEquals(p.bytes, Uint8Array.of(0x87, 0x65));
  }
});

Deno.test("writeInt8Sync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeInt8Sync(p, 0x87);
  assertEquals(p.bytes, Uint8Array.of(0x87));
});

Deno.test("writeInt16LE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeInt16LE(w, 0x8765);
  assertEquals(p.bytes, Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16LESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeInt16LESync(p, 0x8765);
  assertEquals(p.bytes, Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16BE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeInt16BE(w, 0x8765);
  assertEquals(p.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt16BESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeInt16BESync(p, 0x8765);
  assertEquals(p.bytes, Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt32LE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeInt32LE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32LESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeInt32LESync(p, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32BE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeInt32BE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeInt32BESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeInt32BESync(p, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeBigInt64LE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeBigInt64LE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64LESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeBigInt64LESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64BE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeBigInt64BE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeBigInt64BESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeBigInt64BESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeVarInt32LE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeVarInt32LE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarInt32LESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeVarInt32LESync(p, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarInt32BE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeVarInt32BE(w, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeVarInt32BESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeVarInt32BESync(p, 0x87654321);
  assertEquals(p.bytes, Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeBigVarInt64LE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeBigVarInt64LE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarInt64LESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeBigVarInt64LESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarInt64BE", { permissions: "none" }, async () => {
  const p = new BufferWriter();
  const w = p.asStream().getWriter();
  await writeBigVarInt64BE(w, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});

Deno.test("writeBigVarInt64BESync", { permissions: "none" }, () => {
  const p = new BufferWriter();
  writeBigVarInt64BESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes,
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});
