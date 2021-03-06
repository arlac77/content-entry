const defaultStringOptions = { encoding: "utf8" };

/**
 * Content entries where a stream is the primary data representation.
 */
export function StreamContentEntryMixin(superclass) {
  return class StreamContentEntryMixin extends superclass {
    async getString(options = defaultStringOptions) {
      const chunks = [];
      for await (const chunk of await this.getReadStream(options)) {
        chunks.push(chunk);
      }

      return chunks.join("");
    }

    async setString(value, options = defaultStringOptions) {
      return this.setBufferOrString(value, options);
    }

    async getBuffer(options) {
      const chunks = [];
      for await (const chunk of await this.getReadStream(options)) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    }

    async setBuffer(value, options) {
      return this.setBufferOrString(value, options);
    }

    async setBufferOrString(value, options) {
      return new Promise(async (resolve, reject) => {
        const stream = await this.getWriteStream(options);
        stream.once("error", reject);
        stream.once("finish", resolve);
        stream.end(value);
      });
    }
  };
}
