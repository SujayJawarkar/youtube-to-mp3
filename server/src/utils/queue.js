const PQueueModule = require("p-queue");
const PQueue = PQueueModule.default;

// Only 1 download at a time, with a 3 second gap between each
const queue = new PQueue({
  concurrency: 1,
  interval: 3000,
  intervalCap: 1,
});

module.exports = queue;
