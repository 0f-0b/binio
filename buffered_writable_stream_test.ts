import { assertEquals } from "@std/assert/assert-equals";

import { BufferedWritableStream } from "./buffered_writable_stream.ts";

Deno.test("writable", { permissions: "none" }, async () => {
  const chunks: Uint8Array[] = [];
  const assertNewChunks = (expected: readonly Uint8Array[]) => {
    assertEquals(chunks, expected);
    chunks.length = 0;
  };
  const writable = new WritableStream<Uint8Array>({
    write(chunk) {
      chunks.push(chunk);
    },
  });
  const bufferedWritable = new BufferedWritableStream(writable, {
    highWaterMark: 5,
  });
  const writer = bufferedWritable.getWriter();
  await writer.write(Uint8Array.of(1));
  await writer.write(Uint8Array.of(2, 3));
  assertNewChunks([]);
  await writer.write({ type: "flush" });
  assertNewChunks([Uint8Array.of(1, 2, 3)]);
  await writer.write({ type: "write", data: Uint8Array.of(4, 5, 6) });
  assertNewChunks([]);
  await writer.write(Uint8Array.of(7, 8, 9, 10, 11));
  assertNewChunks([Uint8Array.of(4, 5, 6), Uint8Array.of(7, 8, 9, 10, 11)]);
  await writer.write(Uint8Array.of(12, 13, 14));
  assertNewChunks([]);
  await writer.write(Uint8Array.of(15, 16, 17, 18));
  assertNewChunks([Uint8Array.of(12, 13, 14)]);
  await writer.close();
  assertNewChunks([Uint8Array.of(15, 16, 17, 18)]);
});
