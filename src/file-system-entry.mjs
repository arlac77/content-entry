import { ContentEntry } from "./content-entry";
import { StreamContentEntryMixin } from "./stream-content-entry-mixin";
import { join } from "path";
import { createReadStream, createWriteStream, access, constants } from "fs";

export class FileSystemEntry extends StreamContentEntryMixin(ContentEntry) {
  constructor(name, baseDir) {
    super(name);
    Object.defineProperties(this, { baseDir: { value: baseDir } });
  }

  get filename() {
    return join(this.baseDir, this.name);
  }

  async getExists() {
    return await new Promise((resolve, reject) => {
      access(this.filename, constants.F_OK, error =>
        resolve(error ? false : true)
      );
    });
  }

  async getReadStream(options) {
    return createReadStream(this.filename, options);
  }

  async getWriteStream(options) {
    return createWriteStream(this.filename, options);
  }
}
