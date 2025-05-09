import test from "ava";
import { CollectionEntry } from "content-entry";

test("collection entry create default", t => {
  const entry = new CollectionEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.mode, 0o755);
  t.true(entry.isCollection);
  t.true(entry.types.indexOf("public.directory") === 0);
});

test("collection entry create with options", t => {
  const entry = new CollectionEntry("somewhere", { mode: 0o777 });
  t.is(entry.name, "somewhere");
  t.is(entry.mode, 0o777);
  t.true(entry.isCollection);
  t.true(entry.types.indexOf("public.directory") === 0);
});

test("collection entry update", t => {
  const entry = new CollectionEntry("somewhere");

  entry.mode = 0o777;
  t.is(entry.mode, 0o777);
});

test("collection entry equals", async t => {
  const a = new CollectionEntry("a");
  const a2 = new CollectionEntry("a");
  const b = new CollectionEntry("b");
  t.false(await a.equals(b));
  t.true(await a.equals(a));
  t.true(await a.equals(a2));
});
