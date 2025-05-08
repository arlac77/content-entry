import test from "ava";
import { LazyBufferContentEntry } from "content-entry";

test("lazy buffer content entry create", async t => {
  const entry = new LazyBufferContentEntry(
    "somewhere",
    undefined,
    (entry)=> new TextEncoder().encode("abc")
  );

  t.is(entry.name, "somewhere");
  t.false(await entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.is(entry.mode, 420);

  t.is(await entry.size, 3);

  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.string, "abc");
  t.is((await entry.buffer).length, 3);
});

