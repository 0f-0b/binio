/**
 * Signals an abnormal end-of-stream condition.
 *
 * Equivalent to {@linkcode Deno.errors.UnexpectedEof} if the {@linkcode Deno}
 * namespace is available and {@linkcode TypeError} otherwise.
 */
export const UnexpectedEof = typeof Deno === "undefined"
  ? TypeError
  : Deno.errors.UnexpectedEof;

/** Throws an {@linkcode UnexpectedEof} exception. */
export function unexpectedEof(): never {
  throw new UnexpectedEof("Unexpected end of stream");
}
