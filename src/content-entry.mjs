import { BaseEntry } from "./base-entry.mjs";

/**
 * general content access entries
 */
export class ContentEntry extends BaseEntry {
  get isBlob() {
    return true;
  }

  async getTypes() {
    return ["public.content"];
  }

  async getReadStream() {
    return undefined;
  }

  async getString() {
    return undefined;
  }

  async getBuffer() {
    return undefined;
  }

  /**
   * compare content against other entry
   * @param {Entry} other
   * @return {boolean} true if other has the same content (bitwise)
   */
  async equalsContent(other) {
    const [a, b] = await Promise.all([this.getBuffer(), other.getBuffer()]);
  
    if( a === undefined) {
      return a === b;
    }

    return a.equals(b);
  }
}
