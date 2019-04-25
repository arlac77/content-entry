import test from "ava";
import { StringContentEntry } from "../src/string-content-entry.mjs";

test("string content entry create", async t => {
  const entry = new StringContentEntry("somewhere", "abc");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(JSON.stringify(entry), '{"name":"somewhere"}');
  t.is(await entry.getString(), "abc");
  t.is((await entry.getBuffer()).length, 3);
});
