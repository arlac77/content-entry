// @ts-check
import { ContentEntry } from "./content-entry.mjs";
import { emptyReadable } from "./util.mjs";

/**
 * Represents a entry without content (content length = 0).
 */
export class EmptyContentEntry extends ContentEntry {

  /**
   * @return {string}
   */
  get string() {
    return "";
  }

  /**
   * @return {Buffer} zero length buffer
   */

  get buffer() {
    return Int16Array.of();
  }

  /**
   * @returns {ReadableStream} zero length stream.
   */
  get readStream() {
    return emptyReadable();
  }

  /**
   * @deprecated
   */
  async getString() {
    return "";
  }

  /**
   * @deprecated
   */
  async getBuffer() {
    return Int16Array.of();
  }

  /**
   * @deprecated
   */
  async getReadStream() {
    return emptyReadable();
  }
}
