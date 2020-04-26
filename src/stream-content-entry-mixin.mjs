/**
 * Content entries where a stream is the primary data representation
 */

const defaultStringOptions = { encoding: "utf8" };

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
      return new Promise(async (resolve, reject) => {
        const stream = await this.getWriteStream(options);
        stream.once("error", error => reject(error));
        stream.end(value, () => resolve());
      });
    }

    async getBuffer(options) {
      const chunks = [];
      for await (const chunk of await this.getReadStream(options)) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    }

    async setBuffer(value, options) {
      return new Promise(async (resolve, reject) => {
        const stream = await this.getWriteStream(options);
        stream.once("error", error => reject(error));
        stream.end(value, () => resolve());
      });
    }
  };
}
