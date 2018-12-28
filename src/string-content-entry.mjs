import { StringContentEntryMixin } from "./string-content-entry-mixin";
import { ContentEntry } from "./content-entry";

export class StringContentEntry extends StringContentEntryMixin(ContentEntry) {
  constructor(name, value) {
    super(name);
    Object.defineProperties(this, { string: { value } });
  }
}
