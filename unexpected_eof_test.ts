import { assertThrows } from "./deps/std/assert/assert_throws.ts";

import { unexpectedEof } from "./unexpected_eof.ts";

Deno.test("unexpectedEof", { permissions: "none" }, () => {
  assertThrows(unexpectedEof, Deno.errors.UnexpectedEof);
});
