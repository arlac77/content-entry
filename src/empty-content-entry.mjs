import { ContentEntry } from "./content-entry.mjs";
import { Readable } from "stream";

class EmptyStream extends Readable {
  _read() {}
}

let _empty;

/**
 * represents a entry without content (content length = 0)
 */
export class EmptyContentEntry extends ContentEntry {
  async getString() {
    return "";
  }

  async getBuffer() {
    return Buffer.alloc(0);
  }

  async getReadStream() {
    if(!_empty) {
      _empty = new EmptyStream();
    }

    return _empty;
  }
}
