import test from "ava";
import { BaseEntry } from "content-entry";

const entry = new BaseEntry("somewhere");


test("base entry equals", async t => {
    const a = new BaseEntry("a");
    const a2 = new BaseEntry("a");
    const b = new BaseEntry("b");
    t.false(await a.equals(b));
    t.true(await a.equals(a));
    t.true(await a.equals(a2));
  });
  