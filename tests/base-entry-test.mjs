import test from "ava";
import { BaseEntry } from "../src/base-entry";

test("base entry create", t => {
  const entry = new BaseEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, false);
});

test("base entry create invalid name", t => {
  t.throws(() => new BaseEntry("/somewhere"), TypeError);
  t.throws(() => new BaseEntry("somewhere\\abc"), TypeError);
});

