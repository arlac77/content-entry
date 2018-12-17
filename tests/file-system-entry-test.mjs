import test from "ava";
import { FileSystemEntry } from "../src/file-system-entry";

test("fs entry create", t => {
  const entry = new FileSystemEntry("somewhere", "/tmp");
  t.is(entry.name, "somewhere");
  t.is(entry.filename, "/tmp/somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
});

