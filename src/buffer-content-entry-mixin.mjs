import { toReadableStream } from "./util.mjs";

/**
 * Content entries where a Buffer is the primary data representation.
 * @property {Buffer} buffer
 *
 */
export function BufferContentEntryMixin(superclass) {
  return class BufferContentEntryMixin extends superclass {
    /**
     * The default encoding used to convert content to strings.
     * @return {BufferEncoding}
     */
    get encoding() {
      return "utf8";
    }

    /**
     * Deliver content as string
     * @return {string} content
     */
    get string() {
      const buffer = this.buffer;

      return buffer.then
        ? buffer.then(buffer => buffer.toString(this.encoding))
        : buffer.toString(this.encoding);
    }

    /**
     * Deliver content as read stream.
     * @return {ReadableStream} content
     */
    get readStream() {
      const buffer = this.buffer;

      return buffer.then
        ? buffer.then(buffer => toReadableStream(buffer))
        : toReadableStream(buffer);
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
      const buffer = this.buffer;
      return buffer.then
        ? buffer.then(buffer => buffer.length === 0)
        : buffer.length === 0;
    }

    /**
     * @deprecated
     */
    async getString() {
      return (await this.getBuffer()).toString(this.encoding);
    }

    /**
     * @deprecated
     */
    async getBuffer() {
      return this.buffer;
    }

    /**
     * @deprecated
     */
    async getReadStream() {
      return toReadableStream(await this.buffer);
    }
  };
}
