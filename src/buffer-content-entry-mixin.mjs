import { uint8ToStream } from "browser-stream-util";

/**
 * Content entries where a Uint8Array is the primary data representation.
 * @property {Uint8Array} buffer
 *
 */
export function BufferContentEntryMixin(superclass) {
  return class BufferContentEntryMixin extends superclass {
    /**
     * Deliver content as string.
     * @return {string} content
     */
    get string() {
      const buffer = this.buffer;

      return buffer.then
        ? buffer.then(buffer => String.fromCharCode.apply(null, buffer))
        : String.fromCharCode.apply(null, buffer);
    }

    /**
     * Deliver content as read stream.
     * @return {ReadableStream} content
     */
    get readStream() {
      const buffer = this.buffer;

      return buffer.then
        ? buffer.then(buffer => uint8ToStream(buffer))
        : uint8ToStream(buffer);
    }

    /**
     * @return {boolean}
     */
    get isEmpty() {
      const buffer = this.buffer;
      return buffer.then
        ? buffer.then(buffer => buffer.length === 0)
        : buffer.length === 0;
    }

    /**
     * @return {number} number of bytes in the buffer
     */
    get size()
    {
      const buffer = this.buffer;
      return buffer.then
        ? buffer.then(buffer => buffer.length)
        : buffer.length;
    }

    /**
     * @deprecated
     */
    async getReadStream() {
      return uint8ToStream(await this.buffer);
    }
  };
}
