import { BaseEntry } from './base-entry';
import { ContentEntryMixin } from './base-content-entry';

/**
 * represents a entry without content (content length = 0)
 */
export class EmptyContentEntry extends ContentEntryMixin(BaseEntry) {

    async getReadStream() {
      return undefined;
    }

    async getString() {
      return "";
    }

    async getBuffer() {
      return Buffer.alloc(0);
    }
  };
}