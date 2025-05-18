import { uint8ToStream } from "browser-stream-util";
import { ContentEntry } from "./content-entry.mjs";

/**
 * ConentEntry with a Uint8Array as content store.
 */
export class BufferContentEntry extends ContentEntry {
  /**
   * @return {Uint8Array|Promise<Uint8Array>}
   */
  get buffer() {
    // @ts-ignore
    return this.getSource();
  }

  /**
   * Deliver content as string.
   * @return {string|Promise<string>} content
   */
  get string() {
    const buffer = this.getSource();

    // @ts-ignore
    return buffer.then
      // @ts-ignore
      ? buffer.then(buffer => String.fromCharCode.apply(null, buffer))
      : String.fromCharCode.apply(null, buffer);
  }

  /**
   * Deliver content as read stream.
   * @return {ReadableStream} content
   */
  get stream() {
    const buffer = this.getSource();

    // @ts-ignore
    return buffer.then
      // @ts-ignore
      ? buffer.then(buffer => uint8ToStream(buffer))
      // @ts-ignore
      : uint8ToStream(buffer);
  }

  /**
   * @return {boolean}
   */
  get isEmpty() {
    const buffer = this.getSource();
    // @ts-ignore
    return buffer.then
      // @ts-ignore
      ? buffer.then(buffer => buffer.length === 0)
      // @ts-ignore
      : buffer.length === 0;
  }

  /**
   * @return {number|Promise<number>} number of bytes in the buffer
   */
  get size() {
    const buffer = this.getSource();
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
