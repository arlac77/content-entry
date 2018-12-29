import { Readable } from "stream";

export const toReadableStream = input =>
  new Readable({
    read() {
      this.push(input);
      this.push(null);
    }
  });
