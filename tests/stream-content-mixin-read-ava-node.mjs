import test from "ava";
import { ContentEntry, StreamContentEntryMixin } from "content-entry";
import { stringToStream } from "browser-stream-util";


class TestEntry extends StreamContentEntryMixin(ContentEntry) {
  async getReadStream(options) {
    return stringToStream("abc");
  }
}

test("string read (chunks)", async t => {
  const entry = new TestEntry("reading");
  t.is(await entry.string, "abc");
});
