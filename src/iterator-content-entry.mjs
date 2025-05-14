import { ContentEntry } from "./content-entry.mjs";

/**
 * Content entries where a Async iterator is the primary data representation.
 */
export class IteratorContentEntry extends ContentEntry {
  get size() {
    return Array.fromAsync(this.getSource())
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
    return Array.fromAsync(this.getSource()).then(array => array.join(""));
  }

  get stream() {
    return ReadableStream.from(this.getSource());
  }
}
