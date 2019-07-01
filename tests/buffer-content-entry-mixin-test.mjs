import test from "ava";
import { ContentEntry } from "../src/content-entry.mjs";
import { BufferContentEntryMixin } from "../src/buffer-content-entry-mixin.mjs";

export class TestBufferContentEntry extends BufferContentEntryMixin(
  ContentEntry
) {
  async getBuffer() {
    return new Buffer.from("abc");
  }
}

test("buffer content entry create", async t => {
  const entry = new TestBufferContentEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(JSON.stringify(entry), '{"name":"somewhere"}');
  t.is(await entry.getString(), "abc");
  t.is((await entry.getBuffer()).length, 3);
});
