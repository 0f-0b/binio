import assert from "node:assert/strict";

import { readFull, readFullSync } from "./read_full.ts";
import { Uint8ArrayReader } from "./uint8_array_reader.ts";

Deno.test("readFull", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of());
    const r = p.asStream().getReader({ mode: "byob" });
    assert.equal(await readFull(r, new Uint8Array(1)), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    const r = p.asStream().getReader({ mode: "byob" });
    assert.deepEqual(
      await readFull(r, new Uint8Array(3)),
      Uint8Array.of(0x12, 0x34, 0x56),
    );
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    const r = p.asStream().getReader({ mode: "byob" });
    await assert.rejects(
      () => readFull(r, new Uint8Array(5)),
      Deno.errors.UnexpectedEof,
    );
  }
});

Deno.test("readFullSync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of());
    assert.equal(readFullSync(r, new Uint8Array(1)), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    assert.deepEqual(
      readFullSync(r, new Uint8Array(3)),
      Uint8Array.of(0x12, 0x34, 0x56),
    );
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    assert.throws(
      () => readFullSync(r, new Uint8Array(5)),
      Deno.errors.UnexpectedEof,
    );
  }
});
