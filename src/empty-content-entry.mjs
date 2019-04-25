import { ContentEntry } from "./content-entry.mjs";
import { Readable } from "stream";

class EmptyStream extends Readable {
  _read() {}
}

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
    return new EmptyStream();
  }
}
