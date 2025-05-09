import test from "ava";
import { BufferContentEntry } from "content-entry";

test("buffer content entry create", t => {
  const entry = new BufferContentEntry(
    "somewhere",
    undefined,
    new TextEncoder().encode("abc")
  );
  t.is(entry.name, "somewhere");
  t.false(entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.is(entry.mode, 420);
  t.is(entry.size, 3);

  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    mode: 420,
    isBlob: true,
    isCollection: false
  });
  t.is(entry.string, "abc");
  t.is(entry.buffer.length, 3);
});

test("buffer content entry create none empty", async t => {
  const entry = new BufferContentEntry(
    "somewhere",
    undefined,
    new TextEncoder().encode("abc")
  );
  t.is(entry.name, "somewhere");
  t.false(entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.is(entry.size, 3);
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    mode: 420,
    isBlob: true,
    isCollection: false
  });
  t.is(entry.string, "abc");
  t.is(entry.buffer.length, 3);

  const stream = entry.readStream;
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  t.is(chunks[0].length, 3);
});

test("buffer content entry update", t => {
  const entry = new BufferContentEntry(
    "somewhere",
    undefined,
    new TextEncoder().encode("abc")
  );

  entry.mode = 0o644;
  t.is(entry.mode, 0o644);

  entry.sha = 123;
  t.is(entry.sha, 123);
});

test("lazy buffer content entry create", async t => {
  const entry = new BufferContentEntry("somewhere", undefined, async entry =>
    new TextEncoder().encode("abc-" + entry.name)
  );

  t.is(entry.name, "somewhere");
  t.false(await entry.isEmpty);
  t.false(entry.isCollection);
  t.true(entry.isBlob);
  t.is(entry.mode, 420);

  t.is(await entry.size, 13);

  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    mode: 420,
    isBlob: true,
    isCollection: false
  });
  t.is(await entry.string, "abc-somewhere");
  t.is((await entry.buffer).length, 13);
});
