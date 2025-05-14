import { emptyStream } from "browser-stream-util";
import { BaseEntry } from "./base-entry.mjs";
import { equalsUint8Arrays } from "./util.mjs";

/**
 * General content access entries.
 */
export class ContentEntry extends BaseEntry {
  /**
   * Content entries where a string is the primary data representation.
   *
   * @param {string} name
   * @param {object} options
   * @param {string|Uint8Array|ReadableStream<any>|AsyncIterator<string>|((ContentEntry) => Promise<string|Uint8Array|ReadableStream<any>|AsyncIterator<string>>)} source
   *
   */
  constructor(name, options, source) {
    // @ts-ignore
    super(name, options);
    this._source = source;
  }

  getSource() {
    if (typeof this._source === "function") {
      const result = this._source(this);

      if (result?.then) {
        return result?.then(result => (this._source = result));
      }

      return result;
    }

    return this._source;
  }

  /**
   * @return {boolean} true
   */
  get isBlob() {
    return true;
  }

  /**
   * UTI types for this entry.
   * defaults to "public.content".
   * @return {string[]}
   */
  get types() {
    return ["public.content"];
  }

  /**
   * By default an zero length stream.
   * @return {ReadableStream|Promise<ReadableStream>}
   */
  get stream() {
    return emptyStream();
  }

  /**
   * @return {Uint8Array|Promise<Uint8Array>}
   */
  get buffer() {
    return Uint8Array.of();
  }

  /**
   * By default an zero length string.
   * @return {string|Promise<string>}
   */
  get string() {
    return "";
  }

  /**
   * @return {boolean|Promise<boolean>} true if there is no content (length := 0).
   */
  get isEmpty() {
    return this.buffer.length === 0;
  }

  /**
   * @return {number|Promise<number>} size in bytes
   */
  get size() {
    return this.buffer.length;
  }

  /**
   * The default encoding used to convert content to strings.
   * @return {string}
   */
  get encoding() {
    return "utf8";
  }

  /**
   * Compare content against other entry.
   * @param {ContentEntry} other
   * @return {Promise<boolean>} true if other has the same content (bitwise)
   */
  async equalsContent(other) {
    if (other === undefined) {
      return false;
    }

    const [a, b] = await Promise.all([this.buffer, other.buffer]);

    if (a === undefined) {
      return b === undefined;
    }

    return equalsUint8Arrays(a, b);
  }

  /**
   * @deprecated
   */
  get readStream() {
    return emptyStream();
  }
}
