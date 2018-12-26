/**
 * Representation of one file or directory entry
 * All names are asolute (no leading '/') and build with '/'
 * @property {string} name name inside of the container
 *
 * @param {string} name name inside of the container
 */
export class BaseEntry {
  constructor(name) {
    if (name[0] === "/" || name.indexOf("\\") >= 0) {
      throw new TypeError(
        `Names should not contain leading '/' or any '\\': ${name}`
      );
    }

    Object.defineProperties(this, {
      name: { value: name }
    });
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
      name: this.name
    };
  }
}
