import test from "ava";
import { StringContentEntry } from "content-entry";

test("string content entry create", async t => {
  const entry = new StringContentEntry("somewhere", "abc");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(entry.unixMode, 420);
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
