export function emptyReadable() {
  return new ReadableStream({
    async pull(controller) {
      controller.close();
    }
  });
}

export function toReadableStream(input) {
  return new ReadableStream({
    async pull(controller) {
      controller.enqueue(input);
      controller.close();
    }
  });
}
