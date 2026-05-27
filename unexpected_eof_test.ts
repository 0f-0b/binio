import assert from "node:assert/strict";

import { UnexpectedEof, unexpectedEof } from "./unexpected_eof.ts";

Deno.test("unexpectedEof", { permissions: "none" }, () => {
  assert.equal(UnexpectedEof, Deno.errors.UnexpectedEof);
  assert.throws(unexpectedEof, UnexpectedEof);
});
