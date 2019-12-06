import { BufferContentEntryMixin } from "./buffer-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

export class BufferContentEntry extends BufferContentEntryMixin(ContentEntry) {

  buffer;

  constructor(name, buffer) {
    super(name);
    this.buffer = buffer;
  }
}
