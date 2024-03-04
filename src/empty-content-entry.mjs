import { ContentEntry } from "./content-entry.mjs";
import { emptyStream } from "browser-stream-util";

/**
 * Represents a entry without content (content length = 0).
 */
export class EmptyContentEntry extends ContentEntry {

  /**
   * @returns {ReadableStream} zero length stream.
   */
  get readStream() {
    return emptyStream();
  }

  get string()
  {
    return "";
  }
}
