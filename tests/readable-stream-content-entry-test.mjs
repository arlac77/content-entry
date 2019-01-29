import test from "ava";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";
import { ReadableStreamContentEntry } from "../src/readable-stream-content-entry";

const here = dirname(fileURLToPath(import.meta.url));

test("readable stream content entry create", async t => {
  const entry = new ReadableStreamContentEntry(
    "somewhere",
    createReadStream(join(here, "fixtures", "file.txt"), { encoding: 'utf8'})
  );
  t.is(entry.name, "somewhere");
  t.is(entry.isCollection, false);
  t.is(entry.isBlob, true);
  t.is(JSON.stringify(entry), '{"name":"somewhere"}');
  t.is(await entry.getString(), "abc\n");
});


test("readable stream content entry getBuffer", async t => {
  const entry = new ReadableStreamContentEntry(
    "somewhere",
    createReadStream(join(here, "fixtures", "file.txt"))
  );
  t.is((await entry.getBuffer()).length, 4);
});
