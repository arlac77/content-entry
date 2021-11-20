// @ts-check
import { BufferContentEntryMixin } from "./buffer-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

/**
 * @param {string} name
 * @param {Buffer} buffer
 */
export class BufferContentEntry extends BufferContentEntryMixin(ContentEntry) {
  constructor(name, buffer) {
    // @ts-ignore
    super(name);
    Object.defineProperties(this, { buffer: { value: buffer } });
  }

  async isEmpty() {
    return this.buffer.length === 0;
  }
}
