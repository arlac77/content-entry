const DEFAULT_MTIME = new Date(0);

/**
 * Representation of one file or directory entry.
 * All names are absolute (no leading '/') the group seperator is '/'.
 * @param {string} name name inside of the container
 *
 * @property {string} name name inside of the container
 */
export class BaseEntry {
  /** @type {string} */ name;

  /**
   * Representation of one file or directory entry.
   * All names are absolute (no leading '/') the group seperator is '/'.
   * @param {string} name name inside of the container
   * @param {object} [options] name inside of the container
   *
   * @property {string} name name inside of the container
   */
  constructor(name, options) {
    if (name[0] === "/" || name.indexOf("\\") >= 0) {
      throw new TypeError(
        `Names should not contain leading '/' or any '\\': ${name}`
      );
    }

    this.name = name;

    Object.assign(this, options);
  }

  /**
   *
   * @return {string[]} UTI types
   */
  get types() {
    return [];
  }

  /**
   * @return {boolean} false
   */
  get isCollection() {
    return false;
  }

  /**
   * @return {boolean} false
   */
  get isBlob() {
    return false;
  }

  /**
   * Default unix mode for files.
   * @return {number} 0644
   */
  get mode() {
    return this._mode ?? 0o644;
  }

  set mode(value) {
    switch (typeof value) {
      case "string":
        this._mode = parseInt(value, 8);
        break;

      default:
        this._mode = value;
    }
  }

  set mtime(value) {
    this._mtime = value;
  }

  get mtime() {
    return this._mtime ?? DEFAULT_MTIME;
  }

  /**
   * @return {boolean} true if there is no content (length := 0).
   */
  get isEmpty() {
    return true;
  }

  /**
   * @return {boolean} true if we represent a deleted entry
   */
  get isDeleted() {
    return false;
  }

  /**
   * @return {boolean} true if we exist
   */
  get isExistent() {
    return true;
  }

  /**
   *
   * @return {{name:string, mode:number, isBlob: boolean, isCollection: boolean}}
   */
  toJSON() {
    return {
      ...(this.mode === undefined ? { mode: this.mode } : {}),
      name: this.name,
      mode: this.mode,
      isBlob: this.isBlob,
      isCollection: this.isCollection
    };
  }

  /**
   * Is other the same entry?
   * @param {Object} other
   * @return {Promise<boolean>} true if name, isBlob and isCollection are the same
   */
  async equals(other) {
    return (
      other !== undefined &&
      this.name === other.name &&
      this.mode === other.mode &&
      this.isCollection === other.isCollection &&
      this.isBlob === other.isBlob
    );
  }
}
