// @ts-check
import { BaseEntry } from "./base-entry.mjs";

/**
 * Brings directory attributes to entries.
 */
export function CollectionEntryMixin(superclass) {
  return class CollectionEntryMixin extends superclass {

    /**
     * @return {boolean} always true
     */
    get isCollection() {
      return true;
    }

    get types() {
      return ["public.directory"];
    }

    /**
     * Default unix mode for directories.
     * @return {number} 0755
     */
    get unixMode()
    {
      return 493; // 0755;
    }
  };
}

export const BaseCollectionEntry = CollectionEntryMixin(BaseEntry);
