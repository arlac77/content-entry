import test from "ava";
import { DeletedContentEntry } from "content-entry";

test("deleted content entry create", async t => {
  const entry = new DeletedContentEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(entry.isDeleted, true);
  t.is(await entry.isEmpty(), true);
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.getString(), "");
  t.is((await entry.getBuffer()).length, 0);
  t.is((await entry.getReadStream()).read(), null);
});
