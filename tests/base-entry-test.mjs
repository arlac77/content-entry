import test from "ava";
import { BaseEntry } from "../src/base-entry";

test("base entry create", t => {
  const entry = new BaseEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, false);
  t.is(JSON.stringify(entry), '{"name":"somewhere"}');
});

test("base entry equals", async t => {
  const a = new BaseEntry("a");
  const a2 = new BaseEntry("a");
  const b = new BaseEntry("b");
  t.false(await a.equals(b));
  t.true(await a.equals(a));
  t.true(await a.equals(a2));
});

test("base entry create invalid name", t => {
  t.throws(() => new BaseEntry("/somewhere"), TypeError);
  t.throws(() => new BaseEntry("somewhere\\abc"), TypeError);
});
