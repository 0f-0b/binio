import { assertStrictEquals } from "@std/assert/strict-equals";
import { assertThrows } from "@std/assert/throws";

import { UnexpectedEof, unexpectedEof } from "./unexpected_eof.ts";

Deno.test("unexpectedEof", { permissions: "none" }, () => {
  assertStrictEquals(UnexpectedEof, Deno.errors.UnexpectedEof);
  assertThrows(unexpectedEof, UnexpectedEof);
});
