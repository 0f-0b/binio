import { assertEquals } from "./deps/std/assert/assert_equals.ts";
import { assertRejects } from "./deps/std/assert/assert_rejects.ts";
import { assertStrictEquals } from "./deps/std/assert/assert_strict_equals.ts";
import { assertThrows } from "./deps/std/assert/assert_throws.ts";

import {
  Buffer,
  BufReader,
  BufWriter,
  readBigUint64BE,
  readBigUint64BESync,
  readBigUint64LE,
  readBigUint64LESync,
  readBigVarUint64BE,
  readBigVarUint64BESync,
  readBigVarUint64LE,
  readBigVarUint64LESync,
  readFull,
  readFullSync,
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
  unexpectedEof,
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
} from "./mod.ts";

Deno.test("unexpectedEof", { permissions: "none" }, () => {
  assertThrows(unexpectedEof, Deno.errors.UnexpectedEof);
});

Deno.test("readFull", { permissions: "none" }, async () => {
  {
    const r = new BufReader(new Buffer());
    const buf = new Uint8Array(1);
    assertStrictEquals(await readFull(r, buf), null);
  }
  {
    const r = new BufReader(new Buffer([0x12, 0x34, 0x56, 0x78]));
    const buf = new Uint8Array(3);
    assertStrictEquals(await readFull(r, buf), buf);
    assertEquals(buf, Uint8Array.of(0x12, 0x34, 0x56));
  }
  {
    const r = new BufReader(new Buffer([0x12, 0x34, 0x56, 0x78]));
    const buf = new Uint8Array(5);
    await assertRejects(() => readFull(r, buf), Deno.errors.UnexpectedEof);
  }
  {
    const r = new BufReader({
      read() {
        throw new Error("foo");
      },
    });
    const buf = new Uint8Array(1);
    await assertRejects(() => readFull(r, buf), Error, "foo");
  }
});

Deno.test("readFullSync", { permissions: "none" }, () => {
  {
    const p = new Buffer();
    const buf = new Uint8Array(1);
    assertStrictEquals(readFullSync(p, buf), null);
  }
  {
    const p = new Buffer([0x12, 0x34, 0x56, 0x78]);
    const buf = new Uint8Array(3);
    assertStrictEquals(readFullSync(p, buf), buf);
    assertEquals(buf, Uint8Array.of(0x12, 0x34, 0x56));
  }
  {
    const p = new Buffer([0x12, 0x34, 0x56, 0x78]);
    const buf = new Uint8Array(5);
    assertThrows(() => readFullSync(p, buf), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint8", { permissions: "none" }, async () => {
  const r = new BufReader(new Buffer([0x87]));
  assertStrictEquals(await readUint8(r), 0x87);
  assertStrictEquals(await readUint8(r), null);
});

Deno.test("readUint8Sync", { permissions: "none" }, () => {
  const p = new Buffer([0x87]);
  assertStrictEquals(readUint8Sync(p), 0x87);
  assertStrictEquals(readUint8Sync(p), null);
});

Deno.test("readUint16LE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(new Buffer([0x65, 0x87]));
    assertStrictEquals(await readUint16LE(r), 0x8765);
    assertStrictEquals(await readUint16LE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0x65]));
    await assertRejects(() => readUint16LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16LESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0x65, 0x87]);
    assertStrictEquals(readUint16LESync(p), 0x8765);
    assertStrictEquals(readUint16LESync(p), null);
  }
  {
    const p = new Buffer([0x65]);
    assertThrows(() => readUint16LESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(new Buffer([0x87, 0x65]));
    assertStrictEquals(await readUint16BE(r), 0x8765);
    assertStrictEquals(await readUint16BE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0x87]));
    await assertRejects(() => readUint16BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint16BESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0x87, 0x65]);
    assertStrictEquals(readUint16BESync(p), 0x8765);
    assertStrictEquals(readUint16BESync(p), null);
  }
  {
    const p = new Buffer([0x87]);
    assertThrows(() => readUint16BESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(new Buffer([0x21, 0x43, 0x65, 0x87]));
    assertStrictEquals(await readUint32LE(r), 0x87654321);
    assertStrictEquals(await readUint32LE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0x21, 0x43]));
    await assertRejects(() => readUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32LESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0x21, 0x43, 0x65, 0x87]);
    assertStrictEquals(readUint32LESync(p), 0x87654321);
    assertStrictEquals(readUint32LESync(p), null);
  }
  {
    const p = new Buffer([0x21, 0x43]);
    assertThrows(() => readUint32LESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(new Buffer([0x87, 0x65, 0x43, 0x21]));
    assertStrictEquals(await readUint32BE(r), 0x87654321);
    assertStrictEquals(await readUint32BE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0x87, 0x65]));
    await assertRejects(() => readUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readUint32BESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0x87, 0x65, 0x43, 0x21]);
    assertStrictEquals(readUint32BESync(p), 0x87654321);
    assertStrictEquals(readUint32BESync(p), null);
  }
  {
    const p = new Buffer([0x87, 0x65]);
    assertThrows(() => readUint32BESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(
      new Buffer([0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87]),
    );
    assertStrictEquals(await readBigUint64LE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigUint64LE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0x21, 0x43, 0x65, 0x87]));
    await assertRejects(() => readBigUint64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64LESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87]);
    assertStrictEquals(readBigUint64LESync(p), 0x8765432187654321n);
    assertStrictEquals(readBigUint64LESync(p), null);
  }
  {
    const p = new Buffer([0x21, 0x43, 0x65, 0x87]);
    assertThrows(() => readBigUint64LESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(
      new Buffer([0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21]),
    );
    assertStrictEquals(await readBigUint64BE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigUint64BE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0x87, 0x65, 0x43, 0x21]));
    await assertRejects(() => readBigUint64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigUint64BESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21]);
    assertStrictEquals(readBigUint64BESync(p), 0x8765432187654321n);
    assertStrictEquals(readBigUint64BESync(p), null);
  }
  {
    const p = new Buffer([0x87, 0x65, 0x43, 0x21]);
    assertThrows(() => readBigUint64BESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(new Buffer([0xa1, 0x86, 0x95, 0xbb, 0x08]));
    assertStrictEquals(await readVarUint32LE(r), 0x87654321);
    assertStrictEquals(await readVarUint32LE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0xa1, 0x86, 0x95, 0xbb, 0x88]));
    await assertRejects(() => readVarUint32LE(r), TypeError, "too long");
  }
  {
    const r = new BufReader(new Buffer([0xa1]));
    await assertRejects(() => readVarUint32LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32LESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0xa1, 0x86, 0x95, 0xbb, 0x08]);
    assertStrictEquals(readVarUint32LESync(p), 0x87654321);
    assertStrictEquals(readVarUint32LESync(p), null);
  }
  {
    const p = new Buffer([0xa1, 0x86, 0x95, 0xbb, 0x88]);
    assertThrows(() => readVarUint32LESync(p), TypeError, "too long");
  }
  {
    const p = new Buffer([0xa1]);
    assertThrows(() => readVarUint32LESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(new Buffer([0x88, 0xbb, 0x95, 0x86, 0x21]));
    assertStrictEquals(await readVarUint32BE(r), 0x87654321);
    assertStrictEquals(await readVarUint32BE(r), null);
  }
  {
    const r = new BufReader(new Buffer([0x88, 0xbb, 0x95, 0x86, 0xa1]));
    await assertRejects(() => readVarUint32BE(r), TypeError, "too long");
  }
  {
    const r = new BufReader(new Buffer([0x88]));
    await assertRejects(() => readVarUint32BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readVarUint32BESync", { permissions: "none" }, () => {
  {
    const p = new Buffer([0x88, 0xbb, 0x95, 0x86, 0x21]);
    assertStrictEquals(readVarUint32BESync(p), 0x87654321);
    assertStrictEquals(readVarUint32BESync(p), null);
  }
  {
    const p = new Buffer([0x88, 0xbb, 0x95, 0x86, 0xa1]);
    assertThrows(() => readVarUint32BESync(p), TypeError, "too long");
  }
  {
    const p = new Buffer([0x88]);
    assertThrows(() => readVarUint32BESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64LE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(
      new Buffer([0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01]),
    );
    assertStrictEquals(await readBigVarUint64LE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigVarUint64LE(r), null);
  }
  {
    const r = new BufReader(
      new Buffer([0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81]),
    );
    await assertRejects(() => readBigVarUint64LE(r), TypeError, "too long");
  }
  {
    const r = new BufReader(new Buffer([0xa1]));
    await assertRejects(() => readBigVarUint64LE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64LESync", { permissions: "none" }, () => {
  {
    const p = new Buffer(
      [0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01],
    );
    assertStrictEquals(readBigVarUint64LESync(p), 0x8765432187654321n);
    assertStrictEquals(readBigVarUint64LESync(p), null);
  }
  {
    const p = new Buffer(
      [0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x81],
    );
    assertThrows(() => readBigVarUint64LESync(p), TypeError, "too long");
  }
  {
    const p = new Buffer([0xa1]);
    assertThrows(() => readBigVarUint64LESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64BE", { permissions: "none" }, async () => {
  {
    const r = new BufReader(
      new Buffer([0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21]),
    );
    assertStrictEquals(await readBigVarUint64BE(r), 0x8765432187654321n);
    assertStrictEquals(await readBigVarUint64BE(r), null);
  }
  {
    const r = new BufReader(
      new Buffer([0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1]),
    );
    await assertRejects(() => readBigVarUint64BE(r), TypeError, "too long");
  }
  {
    const r = new BufReader(new Buffer([0x81]));
    await assertRejects(() => readBigVarUint64BE(r), Deno.errors.UnexpectedEof);
  }
});

Deno.test("readBigVarUint64BESync", { permissions: "none" }, () => {
  {
    const p = new Buffer(
      [0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21],
    );
    assertStrictEquals(readBigVarUint64BESync(p), 0x8765432187654321n);
    assertStrictEquals(readBigVarUint64BESync(p), null);
  }
  {
    const p = new Buffer(
      [0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0xa1],
    );
    assertThrows(() => readBigVarUint64BESync(p), TypeError, "too long");
  }
  {
    const p = new Buffer([0x81]);
    assertThrows(() => readBigVarUint64BESync(p), Deno.errors.UnexpectedEof);
  }
});

Deno.test("writeInt8", { permissions: "none" }, async () => {
  {
    const p = new Buffer();
    const w = new BufWriter(p, 1);
    await writeInt8(w, 0x87);
    await writeInt8(w, 0x65);
    await w.flush();
    assertEquals(p.bytes(), Uint8Array.of(0x87, 0x65));
  }
  {
    const w = new BufWriter({
      write() {
        throw new Error("foo");
      },
    });
    try {
      await writeInt8(w, 0x87);
      await w.flush();
    } catch {
      // ignored
    }
    await assertRejects(() => writeInt8(w, 0x65), Error, "foo");
  }
});

Deno.test("writeInt8Sync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeInt8Sync(p, 0x87);
  assertEquals(p.bytes(), Uint8Array.of(0x87));
});

Deno.test("writeInt16LE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeInt16LE(w, 0x8765);
  await w.flush();
  assertEquals(p.bytes(), Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16LESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeInt16LESync(p, 0x8765);
  assertEquals(p.bytes(), Uint8Array.of(0x65, 0x87));
});

Deno.test("writeInt16BE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeInt16BE(w, 0x8765);
  await w.flush();
  assertEquals(p.bytes(), Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt16BESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeInt16BESync(p, 0x8765);
  assertEquals(p.bytes(), Uint8Array.of(0x87, 0x65));
});

Deno.test("writeInt32LE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeInt32LE(w, 0x87654321);
  await w.flush();
  assertEquals(p.bytes(), Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32LESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeInt32LESync(p, 0x87654321);
  assertEquals(p.bytes(), Uint8Array.of(0x21, 0x43, 0x65, 0x87));
});

Deno.test("writeInt32BE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeInt32BE(w, 0x87654321);
  await w.flush();
  assertEquals(p.bytes(), Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeInt32BESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeInt32BESync(p, 0x87654321);
  assertEquals(p.bytes(), Uint8Array.of(0x87, 0x65, 0x43, 0x21));
});

Deno.test("writeBigInt64LE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeBigInt64LE(w, 0x8765432187654321n);
  await w.flush();
  assertEquals(
    p.bytes(),
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64LESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeBigInt64LESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes(),
    Uint8Array.of(0x21, 0x43, 0x65, 0x87, 0x21, 0x43, 0x65, 0x87),
  );
});

Deno.test("writeBigInt64BE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeBigInt64BE(w, 0x8765432187654321n);
  await w.flush();
  assertEquals(
    p.bytes(),
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeBigInt64BESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeBigInt64BESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes(),
    Uint8Array.of(0x87, 0x65, 0x43, 0x21, 0x87, 0x65, 0x43, 0x21),
  );
});

Deno.test("writeVarInt32LE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeVarInt32LE(w, 0x87654321);
  await w.flush();
  assertEquals(p.bytes(), Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarInt32LESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeVarInt32LESync(p, 0x87654321);
  assertEquals(p.bytes(), Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x08));
});

Deno.test("writeVarInt32BE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeVarInt32BE(w, 0x87654321);
  await w.flush();
  assertEquals(p.bytes(), Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeVarInt32BESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeVarInt32BESync(p, 0x87654321);
  assertEquals(p.bytes(), Uint8Array.of(0x88, 0xbb, 0x95, 0x86, 0x21));
});

Deno.test("writeBigVarInt64LE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeBigVarInt64LE(w, 0x8765432187654321n);
  await w.flush();
  assertEquals(
    p.bytes(),
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarInt64LESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeBigVarInt64LESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes(),
    Uint8Array.of(0xa1, 0x86, 0x95, 0xbb, 0x98, 0xe4, 0xd0, 0xb2, 0x87, 0x01),
  );
});

Deno.test("writeBigVarInt64BE", { permissions: "none" }, async () => {
  const p = new Buffer();
  const w = new BufWriter(p);
  await writeBigVarInt64BE(w, 0x8765432187654321n);
  await w.flush();
  assertEquals(
    p.bytes(),
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});

Deno.test("writeBigVarInt64BESync", { permissions: "none" }, () => {
  const p = new Buffer();
  writeBigVarInt64BESync(p, 0x8765432187654321n);
  assertEquals(
    p.bytes(),
    Uint8Array.of(0x81, 0x87, 0xb2, 0xd0, 0xe4, 0x98, 0xbb, 0x95, 0x86, 0x21),
  );
});
