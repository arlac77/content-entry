// @ts-check
/**
 * Representation of one file or directory entry.
 * All names are absolute (no leading '/') the group seperator is '/'.
 * @param {string} name name inside of the container
 *
 * @property {string} name name inside of the container
 */
export class BaseEntry {
  constructor(name) {
    if (name[0] === "/" || name.indexOf("\\") >= 0) {
      throw new TypeError(
        `Names should not contain leading '/' or any '\\': ${name}`
      );
    }

    this.name = name;
    /*
    Object.defineProperties(this, {
      name: { get: () => name, set: value => (name = value) }
    });
    */
  }

  /**
   *
   * @return {string[]} UTI types
   */
  get types() {
    return [];
  }

  /**
   * @return {boolean}
   */
  get isCollection() {
    return false;
  }

  /**
   * @return {boolean}
   */
  get isBlob() {
    return false;
  }

  /**
   * Default unix mode for files.
   * @return {number} 0644
   */
  get unixMode() {
    return 420; //0644;
  }

  /**
   * @return {Promise<boolean>} true if there is no content (length := 0).
   */
  async isEmpty() {
    return true;
  }

  /**
   * @return true if we represent a deleted entry
   */
  get isDeleted() {
    return false;
  }

  /**
   * @return true if we exist
   */
  get isExistent() {
    return true;
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

  /**
   * DEPRECATED
   * user type property instead
   */
  async getTypes() {
    return this.types;
  }
}
