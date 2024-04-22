import { assertEquals } from "@std/assert/assert-equals";
import { assertRejects } from "@std/assert/assert-rejects";
import { assertStrictEquals } from "@std/assert/assert-strict-equals";
import { assertThrows } from "@std/assert/assert-throws";

import { readFull, readFullSync } from "./read_full.ts";
import { Uint8ArrayReader } from "./uint8_array_reader.ts";

Deno.test("readFull", { permissions: "none" }, async () => {
  {
    const p = new Uint8ArrayReader(Uint8Array.of());
    const r = p.asStream().getReader({ mode: "byob" });
    assertStrictEquals(await readFull(r, new Uint8Array(1)), null);
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    const r = p.asStream().getReader({ mode: "byob" });
    assertEquals(
      await readFull(r, new Uint8Array(3)),
      Uint8Array.of(0x12, 0x34, 0x56),
    );
  }
  {
    const p = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    const r = p.asStream().getReader({ mode: "byob" });
    await assertRejects(
      () => readFull(r, new Uint8Array(5)),
      Deno.errors.UnexpectedEof,
    );
  }
});

Deno.test("readFullSync", { permissions: "none" }, () => {
  {
    const r = new Uint8ArrayReader(Uint8Array.of());
    assertStrictEquals(readFullSync(r, new Uint8Array(1)), null);
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    assertEquals(
      readFullSync(r, new Uint8Array(3)),
      Uint8Array.of(0x12, 0x34, 0x56),
    );
  }
  {
    const r = new Uint8ArrayReader(Uint8Array.of(0x12, 0x34, 0x56, 0x78));
    assertThrows(
      () => readFullSync(r, new Uint8Array(5)),
      Deno.errors.UnexpectedEof,
    );
  }
});
