const crypto = require("crypto");

const DEFAULT_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHashedKey = key =>
  crypto
    .createHash("sha3-512")
    .update(key)
    .digest("hex");

const formatPartitionKey = (key, options) => {
  let partitionKey = key

  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey)
  }

  if (
    partitionKey.length > MAX_PARTITION_KEY_LENGTH ||
    options.requiresHash
  ) {
    partitionKey = createHashedKey(partitionKey)
  }

  return partitionKey
}

exports.deterministicPartitionKey = (event) => {
  // if no event provided, return default key
  if (!event) {
    return DEFAULT_PARTITION_KEY
  }

  const eventHasKey = event.partitionKey
  const partitionKey = eventHasKey ? event.partitionKey : event
  const formattedPartitionKey = formatPartitionKey(
    partitionKey,
    { requiresHash: !eventHasKey }
  )

  return formattedPartitionKey
};


/** For reference:

 exports.deterministicPartitionKey_old = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      // if pkey on event, get it
      candidate = event.partitionKey;
    } else {
      // if pkey not on event, get a candidate from the event data
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    // convert candidate to string
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    // if not candidate exists, set to default
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    // if candidate is too long, use hashed candidate
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

**/