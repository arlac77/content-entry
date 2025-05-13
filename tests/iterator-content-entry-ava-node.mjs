import test from "ava";
import { IteratorContentEntry } from "content-entry";

test("iterator content entry create", async t => {
  function* source() {
    yield "a";
    yield "b";
    yield "c";
    yield "\n";
  }

  const entry = new IteratorContentEntry("somewhere", { uid: 77 }, source);
  t.is(entry.name, "somewhere");
  t.false(await entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.is(await entry.size, 4);
  t.is(entry.mode, 420);
  t.is(entry.encoding, "utf8");
  t.is(entry.uid, 77);

  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    mode: 420,
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.string, "abc\n");

  const stream = await entry.stream;
  const content = (await Array.fromAsync(stream)).join("");

  t.deepEqual(content, "abc\n");
});
