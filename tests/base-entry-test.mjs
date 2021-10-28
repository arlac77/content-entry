import test from "ava";
import { BaseEntry } from "content-entry";

test("base entry create", async t => {
  const entry = new BaseEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, false);
  t.is(entry.isDeleted, false);
  t.is(entry.isExistent, true);
  t.is(entry.unixMode, parseInt("644",8));
  t.deepEqual(await entry.types, []);
  t.is(await entry.isEmpty(), true);
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    isBlob: false,
    isCollection: false
  });
});

test("base entry equals", async t => {
  const a = new BaseEntry("a");
  const a2 = new BaseEntry("a");
  const b = new BaseEntry("b");
  t.false(await a.equals(b));
  t.true(await a.equals(a));
  t.true(await a.equals(a2));
});

test("base change name", async t => {
  const entry = new BaseEntry("a");
  t.is(entry.name, "a");
  entry.name = 'b';
  t.is(entry.name, "b");
});

test("base entry create invalid name", t => {
  t.throws(() => new BaseEntry("/somewhere"));
  t.throws(() => new BaseEntry("somewhere\\abc"));
});
