import test from "ava";
import { Readable } from 'stream';

import { ContentEntry } from "../src/content-entry.mjs";
import { StreamContentEntryMixin } from "../src/stream-content-entry-mixin.mjs";


const chunks = ["a","b","c"];

class TestReadable extends Readable {
    _read(size)
    {
      for(const c of chunks) {
        this.push(c);
      }
    }
}

class TestEntry extends StreamContentEntryMixin(ContentEntry) {
    async getReadStream(options) {
        return new TestReadable();
    }
}


test("string read (chunks)", async t => {
    const entry = new TestEntry("reading");
    t.is(await entry.getString(), "abc");
});
