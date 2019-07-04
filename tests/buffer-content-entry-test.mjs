import test from "ava";
import { BufferContentEntry } from "../src/buffer-content-entry.mjs";

test("buffer content entry create", async t => {
  const entry = new BufferContentEntry("somewhere", Buffer.from("abc"));
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.getString(), "abc");
  t.is((await entry.getBuffer()).length, 3);
});
