import { toReadableStream } from "./util.mjs";

/**
 * Content entries where a string is the primary data representation
 * @property {string} string
 *
 */
export function StringContentEntryMixin(superclass) {
  return class StringContentEntryMixin extends superclass {
    get encoding() {
      return "utf8";
    }

    async isEmpty() {
      const string = await this.getString();
      return string.length === 0;
    }

    /**
     * Deliver content as string
     * @return {string} content
     */
    async getString() {
      return this.string;
    }

    async getBuffer() {
      return new Buffer.from(this.string, this.encoding);
    }

    /**
     * Deliver content as read stream
     * @return {ReadableStream} content
     */
    async getReadStream() {
      return toReadableStream(this.string);
    }
  };
}
