import { BufferContentEntry } from "./buffer-content-entry.mjs";

export class LazyBufferContentEntry extends BufferContentEntry {
  constructor(name, options, getBuffer) {
    super(name, options);
    this._getBuffer = getBuffer;
  }

  async getBuffer() {
    if (!this._buffer) {
      this._buffer = await this._getBuffer(this);
    }
    return this._buffer;
  }

  get buffer() {
    return this.getBuffer();
  }

  set buffer(value) {
    this._buffer = value;
  }
}
