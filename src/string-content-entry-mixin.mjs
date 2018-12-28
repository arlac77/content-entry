import toReadableStream from "to-readable-stream";

/**
 * Content entries where a string is the primary data representation
 * @property {String} string
 *
 */
export function StringContentEntryMixin(superclass) {
  return class StringContentEntryMixin extends superclass {
    get encoding() {
      return "utf8";
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
