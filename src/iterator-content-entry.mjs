import { ContentEntry } from "./content-entry.mjs";

/**
 * Content entries where a Async iterator is the primary data representation.
 */
export class IteratorContentEntry extends ContentEntry {
  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {object} options
   * @param {AsyncIterator<String>} source
   */
  constructor(name, options, source) {
    super(name, options);
    this.source = source;
  }

  /**
   * @return {string|Promise<string>}
   */
  get string() {
    return Array.fromAsync(this.source).then(array => array.join(""));
  }
}
