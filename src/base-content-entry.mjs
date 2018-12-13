
/**
 * general content access entries
 */
export function ContentEntryMixin(superclass) {
  return class ContentEntryMixin extends superclass {
    get isBlob() {
      return true;
    }

    async getReadStream() {
      return undefined;
    }

    async getString() {
      return undefined;
    }

    async getBuffer() {
      return undefined;
    }
  };
}
