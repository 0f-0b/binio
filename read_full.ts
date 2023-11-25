import { BufferReader } from "./buffer_reader.ts";
import { unexpectedEof } from "./unexpected_eof.ts";

export async function readFull(
  r: ReadableStreamBYOBReader,
  buf: Uint8Array,
): Promise<Uint8Array | null> {
  const { value, done } = await r.read(buf, { min: buf.length });
  if (done) {
    if (!value || value.length === 0) {
      return null;
    }
    unexpectedEof();
  }
  return value;
}

export function readFullSync(
  r: BufferReader,
  buf: Uint8Array,
): Uint8Array | null {
  const requested = buf.length;
  buf = r.read(buf);
  if (buf.length === 0) {
    return null;
  }
  if (buf.length < requested) {
    unexpectedEof();
  }
  return buf;
}
