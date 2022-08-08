const { deterministicPartitionKey } = require("./dpk");

const getMockEvent = (partitionKey) => {
  return {
    eventData: 'abc',
    eventNumbers: 123,
    partitionKey,
  }
}

const KEY_WITH_257_CHARS = 'ylagfgqtdelssxlfbzbtbzemunlrhbljmhnbswzuwqrhmfibhdfhrszvzixapfyryhlzibqigpxglpllurbhicgewwzjdqpynvoxhqenmkxhvmequzsqcmzqpzfmgayafrplnkrfrvywoodjghcipyeortefvfbciphlgsyoozyuosyqunvsfwwfxepvydpoxnzegcqwxusgngmyxtgecupeppkhfadeoyvlawqireohjcqpnfisvgjptbqoiufrq'

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the key when already set on an event", () => {
    const eventKey = deterministicPartitionKey(
      getMockEvent('abcdef')
    );
    expect(eventKey).toBe("abcdef");
  });

  it("Returns the key when already set on an event, and not a string", () => {
    const eventKey = deterministicPartitionKey(
      getMockEvent(1234)
    );
    expect(eventKey).toBe("1234");
  });

  it("Returns a shortened key when the provided key is too long", () => {
    const mockEvent = getMockEvent(KEY_WITH_257_CHARS)
    const eventKey = deterministicPartitionKey(mockEvent);
    expect(eventKey).not.toBe(KEY_WITH_257_CHARS);
    expect(eventKey.length).toBe(128)

    // Check for determinism
    const nextEventKey = deterministicPartitionKey(mockEvent);
    expect(eventKey).toEqual(nextEventKey)
  });

  it("Returns a key when none is provided on the event", () => {
    const mockEvent = getMockEvent()
    const eventKey = deterministicPartitionKey(mockEvent);
    expect(eventKey.length).toBe(128)

    // Check for determinism
    const nextEventKey = deterministicPartitionKey(mockEvent);
    expect(eventKey).toEqual(nextEventKey)
  });
});
