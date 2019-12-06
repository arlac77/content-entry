/**
 * Representation of one file or directory entry
 * All names are asolute (no leading '/') the group seperator is '/'
 * @property {string} name name inside of the container
 *
 * @param {string} name name inside of the container
 */
export class BaseEntry {

  name;

  constructor(name) {
    if (name[0] === "/" || name.indexOf("\\") >= 0) {
      throw new TypeError(
        `Names should not contain leading '/' or any '\\': ${name}`
      );
    }

    this.name = name;
  }

  /**
   *
   * @return {string[]} UTI types
   */
  async getTypes() {
    return [];
  }

  get isCollection() {
    return false;
  }

  get isBlob() {
    return false;
  }

  toJSON() {
    return {
      name: this.name,
      isBlob: this.isBlob,
      isCollection: this.isCollection
    };
  }

  async equals(other) {
    return (
      other !== undefined &&
      this.name === other.name &&
      this.isCollection === other.isCollection &&
      this.isBlob === other.isBlob
    );
  }
}
