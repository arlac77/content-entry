import { toReadableStream } from "./util.mjs";

/**
 * Content entries where a Buffer is the primary data representation.
 * @property {Buffer} buffer
 *
 */
export function BufferContentEntryMixin(superclass) {
  return class BufferContentEntryMixin extends superclass {
    /**
     * The default encoding used to convert conent to strings.
     * @return {string}
     */
    get encoding() {
      return "utf8";
    }

    /**
     * Deliver content as string
     * @return {string} content
     */
    get string() {
      const then = this.buffer.then;

      return then
        ? then(buffer => buffer.toString(this.encoding))
        : this.buffer.toString(this.encoding);
    }

    /**
     * Deliver content as read stream.
     * @return {ReadableStream} content
     */
    get readStream() {
      const then = this.buffer.then;

      return then
        ? then(buffer => toReadableStream(buffer))
        : toReadableStream(this.buffer);
    }

    async isEmpty() {
      const buffer = await this.buffer;
      return buffer.length === 0;
    }

    /**
     * DEPRECATED
     */
    async getString() {
      return (await this.getBuffer()).toString(this.encoding);
    }

    /**
     * DEPRECATED
     */
    async getBuffer() {
      return this.buffer;
    }

    /**
     *
     * DEPRECATED
     */
    async getReadStream() {
      return toReadableStream(await this.buffer);
    }
  };
}
