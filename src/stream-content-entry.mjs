import { ContentEntry } from "./content-entry.mjs";
import { streamToUint8Array, streamToString } from "browser-stream-util";

/**
 * Content entries where a stream is the primary data representation.
 */
export class StreamContentEntry extends ContentEntry {
  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {object} options
   * @param {ReadableStream<any>|((ContentEntry) => Promise<ReadableStream<any>>)} source
   */
  constructor(name, options, source) {
    super(name, options);
    this._source = source;
  }

  getStream(options) {
    if (typeof this._source === "function") {
      this._source = this._source(this);
      this._source?.then(result => (this._source = result));
    }

    return this._source;
  }

  /**
   * By default an zero length stream.
   * @return {ReadableStream|Promise<ReadableStream>}
   */
  get stream() {
    return this.getStream();
  }

  set stream(value) {
    this._source = value;
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
