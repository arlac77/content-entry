import test from "ava";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { FileSystemEntry } from "../src/file-system-entry";

test("fs entry create", t => {
  const entry = new FileSystemEntry("somewhere", "/tmp");
  t.is(entry.name, "somewhere");
  t.is(entry.filename, "/tmp/somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
});

const here = dirname(fileURLToPath(import.meta.url));

test("fs entry getExists true", async t => {
  const entry = new FileSystemEntry("file.txt", join(here, "fixtures"));
  t.true(await entry.getExists());
});

test("fs entry getExists false", async t => {
  const entry = new FileSystemEntry(
    "none_existing.txt",
    join(here, "fixtures")
  );
  t.false(await entry.getExists());
});

test("fs entry getString", async t => {
  const entry = new FileSystemEntry("file.txt", join(here, "fixtures"));
  t.is(await entry.getString(), "abc\n");
});

test("fs entry getReadStream", async t => {
  const entry = new FileSystemEntry("file.txt", join(here, "fixtures"));

  let chunk;
  for await (chunk of await entry.getReadStream({ encoding: "utf-8" })) {
  }

  t.is(chunk, "abc\n");
});
