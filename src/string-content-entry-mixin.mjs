import { toReadableStream } from "./util.mjs";

/**
 * Content entries where a string is the primary data representation.
 * @property {string} string
 *
 */
export function StringContentEntryMixin(superclass) {
  return class StringContentEntryMixin extends superclass {
    get encoding() {
      return "utf8";
    }

    get buffer() {
      return new Buffer.from(this.string, this.encoding);
    }

    /**
     * Deliver content as read stream
     * @return {ReadableStream} content
     */
    get readStream() {
      return toReadableStream(this.string);
    }

    /**
     * DEPRECATED
     */
    async getString() {
      return this.string;
    }

    /**
     * DEPRECATED
     */
     async getReadStream() {
      return toReadableStream(this.string);
    }

    /**
     * DEPRECATED
     */
    async getBuffer() {
      return new Buffer.from(this.string, this.encoding);
    }
  };
}
