import { stringToStream } from "browser-stream-util";
import { ContentEntry } from "./content-entry.mjs";

/**
 * Content entries where a string is the primary data representation.
 *
 */
export class StringContentEntry extends ContentEntry {

  /**
   * @return {string|Promise<string>}
   */
  get string() {
  // @ts-ignore
    return this.getSource();
  }

  /**
   * @returns {boolean} true if string length is zero
   */
  get isEmpty() {
    const string = this.getSource();
    // @ts-ignore
    return string.then
      ? // @ts-ignore
        string.then(bufstringfer => string.length === 0)
      // @ts-ignore
      : string.length === 0;
  }

  /**
   * @return {number|Promise<number>} size in bytes
   */
  get size() {
    const string = this.getSource();
    // @ts-ignore
    return string.then ? string.then(string => string.length) : string.length;
  }

  /**
   * @return {Uint8Array<ArrayBuffer>}
   */
  get buffer() {
    const encoder = new TextEncoder(/*this.encoding*/);
    // @ts-ignore
    return encoder.encode(this.getSource());
  }

  /**
   * Deliver content as read stream
   * @return {ReadableStream} content
   */
  get stream() {
    // @ts-ignore
    return stringToStream(this.getSource());
  }
}
