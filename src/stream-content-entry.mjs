import { ContentEntry } from "./content-entry.mjs";
import { streamToUint8Array, streamToString } from "browser-stream-util";

const defaultStringOptions = { encoding: "utf8" };

/**
 * Content entries where a stream is the primary data representation.
 */
export class StreamContentEntry extends ContentEntry {
  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {object} options
   * @param {ReadableStream} value
   */
  constructor(name, options, value) {
    super(name, options);
    this.stream = value;
  }

  getStream(options) {
    if (typeof this._stream === "function") {
      this._stream = this._stream(this);
      this._stream?.then(result => (this._stream = result));
    }

    return this._stream;
  }

  /**
   * By default an zero length stream.
   * @return {ReadableStream|Promise<ReadableStream>}
   */
  get stream() {
    return this.getStream();
  }

  set stream(value) {
    this._stream = value;
  }

  /**
   * @return {Promise<number>} number of bytes in the buffer
   */
  get size() {
    return this.getBuffer().then(buffer => buffer.length);
  }

  /**
   * @return {Uint8Array|Promise<Uint8Array>}
   */
  get buffer() {
    return this.getBuffer();
  }

  /**
   * @return {string|Promise<string>}
   */
  get string() {
    return this.getString();
  }

  async getString() {
    const stream = await this.getStream();
    return streamToString(stream);
  }

  async getBuffer() {
    return streamToUint8Array(await this.getStream());
  }
}
