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

  /**
   * UTI types for this entry.
   * @return {string[]}
   */
  get types() {
    return ["public.content"];
  }

  /**
   * @return {any} undefined
   */
  get readStream() {
    return undefined;
  }

  /**
   * @return {string}
   */
  get string() {
    return undefined;
  }

  /**
   * return {Uint8Array}
   */
  get buffer() {
    return undefined;
  }

  /**
   * Compare content against other entry.
   * @param {ContentEntry} other
   * @return {Promise<boolean>} true if other has the same content (bitwise)
   */
  async equalsContent(other) {
    if (other === undefined) {
      return false;
    }

    const [a, b] = await Promise.all([this.buffer, other.buffer]);

    if (a === undefined) {
      return b === undefined;
    }

    return b === undefined ? false : a.equals(b);
  }

  /**
   * @deprecated
   */
  async getReadStream() {
    return this.readStream;
  }
}
