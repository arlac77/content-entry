import { BaseEntry } from "./base-entry.mjs";

/**
 * Brings directory attributes to entries.
 */
export class CollectionEntry extends BaseEntry {
  _mode = 0o755;

  set mode(value) {
    this._mode = value;
  }

  /**
   * Default unix mode for directories.
   * @return {number} 0755
   */
  get mode() {
    return this._mode;
  }

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
