/**
 * Content entries where a stream is the primary data representation
 */
export function StreamContentEntryMixin(superclass) {
  return class StreamContentEntryMixin extends superclass {
    async getString(options) {
      const stream = await this.getReadStream(options);

      let value = "";
      for await (chunk of stream) {
        value += chunk;
      }

      return value;
    }
  };
}
