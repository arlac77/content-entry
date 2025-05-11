import { uint8ToStream } from "browser-stream-util";
import { ContentEntry } from "./content-entry.mjs";

/**
 * ConentEntry with a Uint8Array as content store.
 * @property {string} name
 * @property {Uint8Array|function} buffer
 */
export class BufferContentEntry extends ContentEntry {
  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {object} options
   * @param {Uint8Array} value
   */
  constructor(name, options, value) {
    super(name, options);
    this.buffer = value;
  }

  getBuffer() {
    if (typeof this._buffer === "function") {
      this._buffer = this._buffer(this);
      this._buffer?.then(result => (this._buffer = result));
    }
    return this._buffer;
  }

  get buffer() {
    return this.getBuffer();
  }

  set buffer(value) {
    this._buffer = value;
  }

  /**
   * Deliver content as string.
   * @return {string} content
   */
  get string() {
    const buffer = this.getBuffer();

    // @ts-ignore
    return buffer.then
      ? // @ts-ignore
        buffer.then(buffer => String.fromCharCode.apply(null, buffer))
      : String.fromCharCode.apply(null, buffer);
  }

  /**
   * Deliver content as read stream.
   * @return {ReadableStream} content
   */
  get stream() {
    const buffer = this.getBuffer();

    // @ts-ignore
    return buffer.then
      ? // @ts-ignore
        buffer.then(buffer => uint8ToStream(buffer))
      : uint8ToStream(buffer);
  }

  /**
   * @return {boolean}
   */
  get isEmpty() {
    const buffer = this.getBuffer();
    // @ts-ignore
    return buffer.then
      ? // @ts-ignore
        buffer.then(buffer => buffer.length === 0)
      : buffer.length === 0;
  }

  /**
   * @return {number} number of bytes in the buffer
   */
  get size() {
    const buffer = this.getBuffer();
    // @ts-ignore
    return buffer.then ? buffer.then(buffer => buffer.length) : buffer.length;
  }

  /**
   * @deprecated
   */
  async getReadStream() {
    return uint8ToStream(await this.buffer);
  }
}
