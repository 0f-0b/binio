import { assertEquals } from "./deps/std/assert/assert_equals.ts";
import { assertRejects } from "./deps/std/assert/assert_rejects.ts";
import { assertStrictEquals } from "./deps/std/assert/assert_strict_equals.ts";
import { assertThrows } from "./deps/std/assert/assert_throws.ts";

import { BufferReader } from "./buffer_reader.ts";
import { readFull, readFullSync } from "./read_full.ts";

Deno.test("readFull", { permissions: "none" }, async () => {
  {
    const p = new BufferReader(Uint8Array.of());
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readFull(r, new Uint8Array(1)), null);
  }
  {
    const p = new BufferReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    const r = p.asStream().getReader({ mode: "byob" });
    assertEquals(
      await readFull(r, new Uint8Array(3)),
      Uint8Array.of(0x12, 0x34, 0x56),
    );
  }
  {
    const p = new BufferReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(
      () => readFull(r, new Uint8Array(5)),
      Deno.errors.UnexpectedEof,
    );
  }
});

Deno.test("readFullSync", { permissions: "none" }, () => {
  {
    const r = new BufferReader(Uint8Array.of());
    assertStrictEquals(readFullSync(r, new Uint8Array(1)), null);
  }
  {
    const r = new BufferReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    assertEquals(
      readFullSync(r, new Uint8Array(3)),
      Uint8Array.of(0x12, 0x34, 0x56),
    );
  }
  {
    const r = new BufferReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    assertThrows(
      () => readFullSync(r, new Uint8Array(5)),
      Deno.errors.UnexpectedEof,
    );
  }
});
