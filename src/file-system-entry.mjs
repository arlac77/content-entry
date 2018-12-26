import { ContentEntry } from "./content-entry";
import { StreamContentEntryMixin } from "./stream-content-entry-mixin";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";

export class FileSystemEntry extends StreamContentEntryMixin(ContentEntry) {
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

  async getWriteStream(options) {
    return createWriteStream(this.filename, options);
  }
}
