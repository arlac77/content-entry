import test from "ava";
import { BufferContentEntry } from "content-entry";

test("buffer content entry create", async t => {
  const entry = new BufferContentEntry("somewhere", Buffer.from("abc"));
  t.is(entry.name, "somewhere");
  t.is(entry.isEmpty, false);
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(entry.mode, 420);
  t.is(entry.isEmpty, false);

  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.string, "abc");
  t.is((await entry.buffer).length, 3);
});
