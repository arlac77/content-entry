import test from "ava";
import { DeletedContentEntry } from "content-entry";

test("deleted content entry create", async t => {
  const entry = new DeletedContentEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(entry.isDeleted, true);
  t.is(entry.isExistent, false);
  t.is(await entry.isEmpty(), true);
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.string, "");
  t.is((await entry.buffer).length, 0);
  t.is((await entry.readStream).read(), null);
});
