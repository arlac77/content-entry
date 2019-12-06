import { StringContentEntryMixin } from "./string-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

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

  string;

  constructor(name, value) {
    super(name);
    this.string = value;
  }
}
