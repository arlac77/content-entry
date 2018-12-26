import { ContentEntry } from "./content-entry";

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
}
