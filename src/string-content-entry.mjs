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
   * @param {string|((ContentEntry) => Promise<string>)} source
   *
   * @property {string} name
   * @property {string} string
   */
  constructor(name, options, source) {
    // @ts-ignore
    super(name, options);
    this.string = source;
  }

  getString() {
    if (typeof this._source === "function") {
      this._source = this._source(this);
      this._source?.then(result => (this._source = result));
    }
    return this._source;
  }

  get string() {
    return this.getString();
  }

  set string(value) {
    this._source = value;
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
  get stream() {
    // @ts-ignore
    return stringToStream(this.getString());
  }
}
