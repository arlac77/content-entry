import { StringContentEntryMixin } from "./string-content-entry-mixin";
import { ContentEntry } from "./content-entry";

/**
 * Content entries where a string is the primary data representation
 *
 * @param {string} name
 * @param {string} value
 *
 * @property {string} name
 * @property {string} string
 */
export class StringContentEntry extends StringContentEntryMixin(ContentEntry) {
  constructor(name, value) {
    super(name);
    Object.defineProperties(this, { string: { value } });
  }
}
