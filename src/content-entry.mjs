import { BaseEntry } from "./base-entry";

/**
 * general content access entries
 */
export class ContentEntry extends BaseEntry {
  get isBlob() {
    return true;
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
}
