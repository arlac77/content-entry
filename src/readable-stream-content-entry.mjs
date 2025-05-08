import { StreamContentEntryMixin } from "./stream-content-entry-mixin.mjs";
import { ContentEntry } from "./content-entry.mjs";

/**
 * Content entries where a readable stream is the primary data representation.
 */
export class ReadableStreamContentEntry extends StreamContentEntryMixin(
  ContentEntry
) {
  readStream;

  /**
   * Content entries where a readable stream is the primary data representation.
   *
   * @param {string} name
   * @param {object} options
   * @param {ReadableStream} readStream
   *
   * @property {string} name
   * @property {ReadableStream} readStream
   */
  constructor(name, options, readStream) {
    // @ts-ignore
    super(name, options);
    this.readStream = readStream;
  }
}
