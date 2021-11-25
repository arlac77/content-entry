// @ts-check
import { Readable } from "stream";
import { toReadableStream } from "./util.mjs";

/**
 * Content entries where a string is the primary data representation.
 * @property {string} string
 */
export function StringContentEntryMixin(superclass) {
  return class StringContentEntryMixin extends superclass {

    /**
     * @return {BufferEncoding} encoding
     */
    get encoding() {
      return "utf8";
    }

    /**
     * @return {Buffer}
     */
    get buffer() {
      return Buffer.from(this.string, this.encoding);
    }

    /**
     * Deliver content as read stream
     * @return {Readable} content
     */
    get readStream() {
      return toReadableStream(this.string);
    }

    /**
     * @deprecated
     */
    async getString() {
      return this.string;
    }

    /**
     * @deprecated
     */
     async getReadStream() {
      return toReadableStream(this.string);
    }

    /**
     * @deprecated
     */
    async getBuffer() {
      return Buffer.from(this.string, this.encoding);
    }
  };
}
