import { stringToStream } from "browser-stream-util";
import { ContentEntry } from "./content-entry.mjs";

/**
 * Content entries where a string is the primary data representation.
 *
 * @param {string} name
 * @param {string} value
 *
 * @property {string} name
 * @property {string} string
 */
export class StringContentEntry extends ContentEntry {
  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {object} options
   * @param {string} value
   *
   * @property {string} name
   * @property {string} string
   */
  constructor(name, options, value) {
    // @ts-ignore
    super(name, options);
    this.string = value;
  }

  getString() {
    if (typeof this._string === "function") {
      this._string = this._string(this);
      this._string?.then(result => (this._string = result));
    }
    return this._string;
  }

  get string() {
    return this.getString();
  }

  set string(value) {
    this._string = value;
  }

  /**
   * @returns {boolean} true if string length is zero
   */
  get isEmpty() {
    const string = this.getString();
    // @ts-ignore
    return string.then
      ? // @ts-ignore
        string.then(bufstringfer => string.length === 0)
      : string.length === 0;
  }

  /**
   * @return {number} size in chars
   */
  get size() {
    const string = this.getString();
    // @ts-ignore
    return string.then ? string.then(string => string.length) : string.length;
  }

  /**
   * @return {Uint8Array<ArrayBuffer>}
   */
  get buffer() {
    const encoder = new TextEncoder(/*this.encoding*/);
    // @ts-ignore
    return encoder.encode(this.getString());
  }

  /**
   * Deliver content as read stream
   * @return {ReadableStream} content
   */
  get readStream() {
    // @ts-ignore
    return stringToStream(this.getString());
  }
}
