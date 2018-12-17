import { BaseEntry } from "./base-entry";
import { ContentEntryMixin } from "./content-entry-mixin";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";

export class FileSystemEntry extends ContentEntryMixin(BaseEntry) {
  constructor(name, baseDir) {
    super(name);
    Object.defineProperties(this, { baseDir: { value: baseDir } });
  }

  get filename() {
    return join(this.baseDir, this.name);
  }

  async getReadStream(options) {
    return createReadStream(this.filename, options);
  }

  async getString(options) {
      const stream = await this.getReadStream(options);

      let value = '';
      for await (chunk of stream) {
        value += chunk;
      }

      return value;
  }

  async getWriteStream(options) {
    return createWriteStream(this.filename, options);
  }
}
