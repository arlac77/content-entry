// @ts-check
import { BaseEntry } from "./base-entry.mjs";

/**
 * General content access entries.
 */
export class ContentEntry extends BaseEntry {
  /**
   * @return {boolean} true
   */
  get isBlob() {
    return true;
  }

  get types() {
    return ["public.content"];
  }

  get readStream() {
    return undefined;
  }

  /**
   * @return {string}
   */
  get string() {
    return undefined;
  }

  get buffer() {
    return undefined;
  }

  /**
   * Compare content against other entry.
   * @param {ContentEntry} other
   * @return {Promise<boolean>} true if other has the same content (bitwise)
   */
  async equalsContent(other) {
    const [a, b] = await Promise.all([this.getBuffer(), other.getBuffer()]);

    if (a === undefined) {
      return b === undefined;
    }

    return a.equals(b);
  }

  /**
   * @deprecated
   */
  async getReadStream() {
    return this.readStream;
  }

  /**
   * @deprecated
   */
  async getString() {
    return this.string;
  }

  /**
   * @deprecated
   */
  async getBuffer() {
    return this.buffer;
  }
}
