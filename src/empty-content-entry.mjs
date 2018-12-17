import { BaseEntry } from './base-entry';
import { ContentEntryMixin } from './content-entry-mixin';

/**
 * represents a entry without content (content length = 0)
 */
export class EmptyContentEntry extends ContentEntryMixin(BaseEntry) {

    async getString() {
      return "";
    }

    async getBuffer() {
      return Buffer.alloc(0);
    }
}
