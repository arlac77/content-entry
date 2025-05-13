import test from "ava";
import { StringContentEntry } from "content-entry";

test("string content entry create", async t => {
  const entry = new StringContentEntry("somewhere", { uid: 77 }, "abc\n");
  t.is(entry.name, "somewhere");
  t.false(entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.is(entry.size, 4);
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
  t.is((await entry.buffer).length, 4);

  const stream = await entry.stream;
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  t.is(chunks[0].length, 4);
});

test("lazy string content entry create", async t => {
  const entry = new StringContentEntry(
    "somewhere",
    undefined,
    async entry => "abc\n"
  );
  t.is(entry.name, "somewhere");
  t.false(await entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.is(await entry.size, 4);
  t.is(entry.mode, 420);
  t.is(entry.encoding, "utf8");

  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    mode: 420,
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.string, "abc\n");
  t.is((await entry.buffer).length, 4);
  t.deepEqual(await entry.buffer, new Uint8Array([97, 98, 99, 10]));

  const stream = await entry.stream;
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  t.is(chunks[0].length, 4);
});

test("string content entry update", async t => {
  const entry = new StringContentEntry("somewhere", undefined, "abc");

  entry.mode = 0o644;
  t.is(entry.mode, 0o644);

  entry.sha = 123;
  t.is(entry.sha, 123);
});
