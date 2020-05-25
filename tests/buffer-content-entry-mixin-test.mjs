import test from "ava";
import { BufferContentEntryMixin, ContentEntry } from "content-entry";

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
  t.is(await entry.isEmpty(), false);
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.getString(), "abc");
  t.is((await entry.getBuffer()).length, 3);

  const stream = await entry.getReadStream();
  const chunks = [];
  for await( const chunk of stream) {
    chunks.push(chunk);
  }

  t.is(chunks[0].length, 3);
});
