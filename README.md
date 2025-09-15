# binio

Utilities for reading and writing structured binary data.

## Example

```ts
import {
  readFullSync,
  readVarUint32LESync,
  Uint8ArrayReader,
  Uint8ArrayWriter,
  unexpectedEof,
  writeVarUint32LESync,
} from "@ud2/binio";

const encoder = new TextEncoder();
const decoder = new TextDecoder(undefined, { fatal: true, ignoreBOM: true });

function serialize(strs: Iterable<string>): Uint8Array<ArrayBuffer> {
  const w = new Uint8ArrayWriter();
  for (const str of strs) {
    const encoded = encoder.encode(str);
    writeVarUint32LESync(w, encoded.length);
    w.write(encoded);
  }
  return w.bytes;
}

function deserialize(buf: Uint8Array<ArrayBuffer>): string[] {
  const r = new Uint8ArrayReader(buf);
  const strs: string[] = [];
  for (;;) {
    const len = readVarUint32LESync(r);
    if (len === null) {
      break;
    }
    const encoded = readFullSync(r, new Uint8Array(len)) ?? unexpectedEof();
    strs.push(decoder.decode(encoded));
  }
  return strs;
}

console.log(deserialize(serialize(["foo", "bar"])));
```
