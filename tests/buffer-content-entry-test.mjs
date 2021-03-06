import test from "ava";
import { BufferContentEntry } from "content-entry";

test("buffer content entry create", async t => {
  const entry = new BufferContentEntry("somewhere", Buffer.from("abc"));
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
});
