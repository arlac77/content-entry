// @ts-check
import { Readable } from "stream";

class EmptyReadable extends Readable {
  _read() {
    this.push(null);
  }
}

let _emptyReadable;

export function emptyReadable() {
  if (!_emptyReadable) {
    _emptyReadable = new EmptyReadable();
  }

  return _emptyReadable;
}

/**
 *
 * @param {string} input
 * @returns {Readable}
 */
export const toReadableStream = input =>
  new Readable({
    read() {
      this.push(input);
      this.push(null);
    }
  });

export function concatUint8Arrays(...bufs) {
  const result = new Uint8Array(
    bufs.reduce((totalSize, buf) => totalSize + buf.byteLength, 0)
  );
  bufs.reduce((offset, buf) => {
    result.set(buf, offset);
    return offset + buf.byteLength;
  }, 0);
  return result;
}

/**
 * Returns true if the two passed Uint8Arrays have the same content
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 */
 export function equalsUint8Arrays(a, b) {
  if (a === b) {
    return true
  }

  if (a.byteLength !== b.byteLength) {
    return false
  }

  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}
