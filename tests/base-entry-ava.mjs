import test from "ava";
import { BaseEntry } from "content-entry";

test("base entry create", t => {
  const entry = new BaseEntry("somewhere");
  t.is(entry.name, "somewhere", "name");
  t.true(entry.isEmpty, "isEmpty");
  t.false(entry.isCollection, "isCollection");
  t.false(entry.isBlob, "isBlob");
  t.false(entry.isDeleted, "isDeleted");
  t.true(entry.isExistent, "isExistand");
  t.is(entry.mode, 0o644, "mode");
  t.deepEqual(entry.types, [], "types");
  t.deepEqual(JSON.parse(JSON.stringify(entry)), {
    name: "somewhere",
    mode: 0o644,
    isBlob: false,
    isCollection: false
  });
});

test("base entry create with options", t => {
  let entry = new BaseEntry("somewhere", { mode: 0o666 });
  t.is(entry.name, "somewhere", "name");
  t.is(entry.mode, 0o666, "mode");

  entry = new BaseEntry("somewhere", { mode: "666" });
  t.is(entry.name, "somewhere", "name");
  t.is(entry.mode, 0o666, "mode");

  entry = new BaseEntry("somewhere", { mode: "0666" });
  t.is(entry.name, "somewhere", "name");
  t.is(entry.mode, 0o666, "mode");
});

test("base entry set/get user & group", t => {
  let entry = new BaseEntry("somewhere", { mode: 0o666 });
  t.is(entry.name, "somewhere", "name");
  t.is(entry.mode, 0o666, "mode");
  entry.user = "a";
  t.is(entry.user, "a");
  entry.group = "b";
  t.is(entry.group, "b");
});

test("base entry equals", async t => {
  const a = new BaseEntry("a");
  const a2 = new BaseEntry("a");
  const b = new BaseEntry("b");
  t.false(await a.equals(b));
  t.true(await a.equals(a));
  t.true(await a.equals(a2));
});

test("base change name", t => {
  const entry = new BaseEntry("a");
  t.is(entry.name, "a");
  entry.name = "b";
  t.is(entry.name, "b");
});

test("base change mode", t => {
  const entry = new BaseEntry("a");
  t.is(entry.mode, 0o644);

  entry.mode = 0o600;
  t.is(entry.mode, 0o600);

  entry.mode = "666";
  t.is(entry.mode, 0o666);
});

test("base entry create invalid name", t => {
  t.throws(() => new BaseEntry("/somewhere"));
  t.throws(() => new BaseEntry("somewhere\\abc"));
});
