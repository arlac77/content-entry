import test from "ava";
import { BaseEntry, BaseCollectionEntry } from "../src/entry.mjs";

test("exports present", t => {
  const e1 = new BaseEntry("somewhere");
  t.is(e1.name, "somewhere");
  const e2 = new BaseCollectionEntry("somewhere");
  t.is(e2.name, "somewhere");
});
