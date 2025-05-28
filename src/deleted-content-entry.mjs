import { ContentEntry } from "./content-entry.mjs";

/**
 * Represents a deleted entry.
 */
export class DeletedContentEntry extends ContentEntry {

  get mode()
  {
    return 0;
  }
  
  /**
   * We are always deleted.
   *
   * @return {boolean} true
   */
  get isDeleted() {
    return true;
  }

  /**
   * Nothing there any more.
   * @return {boolean} false
   */
  get isExistent()
  {
    return false;
  }
}
