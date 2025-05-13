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

  get size() {
    return Array.fromAsync(this.source())
      .then(array => array.join(""))
      .then(string => string.length);
  }

  get isEmpty() {
    return this.size.then(size => size === 0);
  }

  /**
   * @return {string|Promise<string>}
   */
  get string() {
    return Array.fromAsync(this.source()).then(array => array.join(""));
  }

  get stream() {
    return ReadableStream.from(this.source());
  }
}
