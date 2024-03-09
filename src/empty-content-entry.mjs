import { ContentEntry } from "./content-entry.mjs";

/**
 * Represents a entry without content (content length = 0).
 */
export class EmptyContentEntry extends ContentEntry {

  get string()
  {
    return "";
  }
}
