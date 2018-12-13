import test from "ava";
import { BaseCollectionEntry } from "../src/base-collection-entry";

test("collection entry create", async t => {
  const entry = new BaseCollectionEntry("somewhere");
  t.is(entry.name, "somewhere");
  t.true(entry.isCollection);
  t.true((await entry.getTypes()).indexOf("public.directory") === 0);
});
