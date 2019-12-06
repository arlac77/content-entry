import { ContentEntry } from "./content-entry.mjs";
import { StreamContentEntryMixin } from "./stream-content-entry-mixin.mjs";
import { join } from "path";
import { createReadStream, createWriteStream, access, constants } from "fs";

/**
 * A content entry backed by a file
 */
export class FileSystemEntry extends StreamContentEntryMixin(ContentEntry) {

  baseDir;

  constructor(name, baseDir) {
    super(name);
    this.baseDir = baseDir;
  }

  /**
   * absolute file path
   */
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

  toJSON() {
    const json = super.toJSON();
    json.baseDir = this.baseDir;
    return json;
  }

}
