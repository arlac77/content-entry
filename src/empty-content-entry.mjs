import { ContentEntry } from "./content-entry.mjs";
import { emptyReadable } from "./util.mjs";

/**
 * Represents a entry without content (content length = 0).
 */
export class EmptyContentEntry extends ContentEntry {
  get string() {
    return "";
  }

  /**
   * @return {Buffer} zero length buffer
   */

  get buffer() {
    return Buffer.alloc(0);
  }

  /**
   * @returns {Readable} zero length stream.
   */
  get readStream() {
    return emptyReadable();
  }

  /**
   * DEPRECATED
   */
  async getString() {
    return "";
  }

  /**
   * DEPRECATED
   */
  async getBuffer() {
    return Buffer.alloc(0);
  }

  /**
   * DEPRECATED
   */
  async getReadStream() {
    return emptyReadable();
  }
}
