import { BaseEntry } from "./base-entry.mjs";

/**
 * Brings directory attributes to entries.
 */
export class CollectionEntry extends BaseEntry {
  /**
   *
   * @param {string} name
   * @param {object} [options]
   */
  constructor(name, options) {
    super(name);
    Object.assign(this, options);
  }

  _mode = 0o755;

  /**
   * @return {boolean} always true
   */
  get isCollection() {
    return true;
  }

  /**
   * UTI
   * @return {string[]} "public.directory"
   */
  get types() {
    return ["public.directory"];
  }
}
