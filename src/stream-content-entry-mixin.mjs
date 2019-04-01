/**
 * Content entries where a stream is the primary data representation
 */

const defaultStringOptions = { encoding: "utf8" };

export function StreamContentEntryMixin(superclass) {
  return class StreamContentEntryMixin extends superclass {
    async getString(options = defaultStringOptions) {
      const stream = await this.getReadStream(options);

      let value = "";
      for await (const chunk of stream) {
        value += chunk;
      }

      return value;
    }

    async setString(value, options = defaultStringOptions) {
      const stream = await this.getWriteStream(options);

      return new Promise((resolve, reject) =>
        stream.end(value, () => resolve())
      );
    }

    async getBuffer(options) {
      const stream = await this.getReadStream(options);

      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    }

    async setBuffer(value, options) {
      const stream = await this.getWriteStream(options);

      return new Promise((resolve, reject) =>
        stream.end(value, () => resolve())
      );
    }
  };
}
