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
  // @ts-ignore
  /** @type {string} */ string;

  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {string} value
   *
   * @property {string} name
   * @property {string} string
   */
  constructor(name, value) {
    // @ts-ignore
    super(name);
    this.string = value;
  }

  get string()
  {
    return this._string;
  }

  set string(value)
  {
    this._string = value;
  }
  
  /**
   *
   * @returns {boolean} true if string length is zero
   */
  get isEmpty() {
    return this.string.length === 0;
  }

  /**
   * @return {Number} size in bytes
   */
  get size() {
    return this.string.length;
  }

  /**
   * @return {Uint8Array<ArrayBuffer>}
   */
  get buffer() {
    const encoder = new TextEncoder(/*this.encoding*/);
    // @ts-ignore
    return encoder.encode(this.string);
  }

  /**
   * Deliver content as read stream
   * @return {ReadableStream} content
   */
  get readStream() {
    // @ts-ignore
    return stringToStream(this.string);
  }
}
