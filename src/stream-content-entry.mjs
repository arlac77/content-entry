import { ContentEntry } from "./content-entry.mjs";
import { streamToUint8Array, streamToString } from "browser-stream-util";

/**
 * Content entries where a stream is the primary data representation.
 */
export class StreamContentEntry extends ContentEntry {

  /**
   * By default an zero length stream.
   * @return {ReadableStream|Promise<ReadableStream>}
   */
  get stream() {
    return this.getSource();
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
    const stream = await this.getSource();
    return streamToString(stream);
  }

  async getBuffer() {
    return streamToUint8Array(await this.getSource());
  }
}
