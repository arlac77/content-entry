import { BaseEntry } from "./base-entry";

/**
 * brings Directory attributes to entries
 */
export function CollectionEntryMixin(superclass) {
  return class CollectionEntryMixin extends superclass {
    get isCollection() {
      return true;
    }

    async getTypes() {
      return ["public.directory"];
    }
  };
}


export const BaseCollectionEntry = CollectionEntryMixin(BaseEntry);
