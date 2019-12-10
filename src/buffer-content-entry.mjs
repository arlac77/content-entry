import { BufferContentEntryMixin } from "./buffer-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

export class BufferContentEntry extends BufferContentEntryMixin(ContentEntry) {
  constructor(name, buffer) {
    super(name);
    Object.defineProperties(this, { buffer: { value: buffer } });
  }
}
