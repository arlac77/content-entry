import { ContentEntry } from "../content-entry.mjs";
import { emptyReadable } from "./util.mjs";

/**
 * Represents a entry without content (content length = 0).
 */
export class EmptyContentEntry extends ContentEntry {
  async getString() {
    return "";
  }

  /**
   * @return {Buffer} zero length buffer
   */
  async getBuffer() {
    return Buffer.alloc(0);
  }

  /**
   * @returns {Readable} zero length stream.
   */
  async getReadStream() {
    return emptyReadable();
  }
}
