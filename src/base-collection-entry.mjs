import { BaseEntry } from "./base-entry.mjs";

/**
 * brings directory attributes to entries
 */
export function CollectionEntryMixin(superclass) {
  return class CollectionEntryMixin extends superclass {
    get isCollection() {
      return true;
    }

    async getTypes() {
      return ["public.directory"];
    }

    /**
     * Default unix mode for directories
     */
    get unixMode()
    {
      return 0755;
    }
  };
}

export const BaseCollectionEntry = CollectionEntryMixin(BaseEntry);
