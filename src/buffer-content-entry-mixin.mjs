import { toReadableStream } from "./util.mjs";

/**
 * Content entries where a buffer is the primary data representation
 * @property {Buffer} buffer
 *
 */
export function BufferContentEntryMixin(superclass) {
  return class BufferContentEntryMixin extends superclass {

    /**
     * the default encoding used to convert conent to strings
     * @return {string}
     */
    get encoding() {
      return "utf8";
    }

    /**
     * Deliver content as string
     * @return {string} content
     */
    async getString() {
      return this.buffer.toString(this.encoding);
    }

    async getBuffer() {
      return this.buffer;
    }

    /**
     * Deliver content as read stream
     * @return {ReadableStream} content
     */
    async getReadStream() {
      return toReadableStream(this.buffer);
    }
  };
}
