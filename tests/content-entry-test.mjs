import test from "ava";
import { ContentEntry } from "content-entry";

test("content entry create", async t => {
  const entry = new ContentEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(await entry.string, undefined);
  t.is(await entry.buffer, undefined);
  t.is(await entry.readStream, undefined);
  t.is(entry.name, "somewhere");
  t.true(entry.isBlob);
  t.is(entry.mode,420);
  t.is(await entry.isEmpty(), true);
  t.true((await entry.types).indexOf("public.content") === 0);
});

test("content entry equals", async t => {
  const a = new ContentEntry("a");
  const a2 = new ContentEntry("a");
  const b = new ContentEntry("b");
  t.false(await a.equals(b));
  t.true(await a.equals(a));
  t.true(await a.equals(a2));
});

test("content entry equalsContent", async t => {
  const a = new ContentEntry("a");
  const b = new ContentEntry("b");
  t.true(await a.equalsContent(b));
  t.true(await a.equalsContent(a));
  t.true(await b.equalsContent(a));
});
