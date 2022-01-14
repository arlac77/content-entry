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
     * @return {Uint8Array}
     */
    get buffer() {
      const encoder = new TextEncoder( /*this.encoding*/);
      return encoder.encode(this.string);
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
     async getReadStream() {
      return toReadableStream(this.string);
    }
  };
}
