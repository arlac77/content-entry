import test from "ava";
import { BufferContentEntryMixin, ContentEntry } from "content-entry";

export class TestBufferContentEntry extends BufferContentEntryMixin(
  ContentEntry
) {
  get buffer() {
    return new Buffer.from("abc");
  }
}

test("buffer content entry create", async t => {
  const entry = new TestBufferContentEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.false(entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.string, "abc");
  t.is((await entry.buffer).length, 3);

  const stream = await entry.readStream;
  const chunks = [];
  for await( const chunk of stream) {
    chunks.push(chunk);
  }

  t.is(chunks[0].length, 3);
});
