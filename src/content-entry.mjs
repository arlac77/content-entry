import { BaseEntry } from "./base-entry.mjs";

/**
 * General content access entries.
 */
export class ContentEntry extends BaseEntry {
  get isBlob() {
    return true;
  }

  get types() {
    return ["public.content"];
  }

  get readStream() {
    return undefined;
  }

  get string() {
    return undefined;
  }

  get buffer() {
    return undefined;
  }

  /**
   * Compare content against other entry.
   * @param {Entry} other
   * @return {boolean} true if other has the same content (bitwise)
   */
  async equalsContent(other) {
    const [a, b] = await Promise.all([this.getBuffer(), other.getBuffer()]);

    if (a === undefined) {
      return a === b;
    }

    return a.equals(b);
  }

  /**
   * DEPRECATED
   */
  async getReadStream() {
    return this.readStream;
  }

  /**
   * DEPRECATED
   */
  async getString() {
    return this.string;
  }

  /**
   * DEPRECATED
   */
  async getBuffer() {
    return this.buffer;
  }
}
