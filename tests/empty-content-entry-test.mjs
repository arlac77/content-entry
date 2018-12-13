import test from "ava";
import { EmptyContentEntry } from "../src/empty-content-entry";

test("empty content entry create", async t => {
  const entry = new EmptyConentEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(await entry.getString(), "");
});


