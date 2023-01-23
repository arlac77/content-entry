// @ts-check
import { ContentEntry } from "./content-entry.mjs";
import { emptyReadable } from "#util-stream.mjs";

/**
 * Represents a entry without content (content length = 0).
 */
export class EmptyContentEntry extends ContentEntry {

  /**
   * @returns {ReadableStream} zero length stream.
   */
  get readStream() {
    return emptyReadable();
  }
}
