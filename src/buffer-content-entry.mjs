import { BufferContentEntryMixin } from "./buffer-content-entry-mixin";
import { ContentEntry } from "./content-entry";

export class BufferContentEntry extends BufferContentEntryMixin(ContentEntry) {
  constructor(name, buffer) {
    super(name);
    Object.defineProperties(this, { buffer: { value: buffer } });
  }
}
