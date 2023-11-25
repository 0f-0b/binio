const UnexpectedEof = typeof Deno === "undefined"
  ? TypeError
  : Deno.errors.UnexpectedEof;

export function unexpectedEof(): never {
  throw new UnexpectedEof("Unexpected end of stream");
}
