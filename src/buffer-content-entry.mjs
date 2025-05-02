import { uint8ToStream } from "browser-stream-util";
import { ContentEntry } from "./content-entry.mjs";

/**
 * ConentEntry with a Uint8Array as content store.
 * @property {string} name
 * @property {Uint8Array} buffer
 */
export class BufferContentEntry extends ContentEntry {
  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {Uint8Array} value
   */
  constructor(name, value) {
    // @ts-ignore
    super(name);
    this.buffer = value;
  }

  get buffer() {
    return this._buffer;
  }

  set buffer(value) {
    this._buffer = value;
  }

  /**
   * Deliver content as string.
   * @return {string} content
   */
  get string() {
    const buffer = this.buffer;

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
  get readStream() {
    const buffer = this.buffer;

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
    const buffer = this.buffer;
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
    const buffer = this.buffer;
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
