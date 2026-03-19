const PQueueModule = require("p-queue");
const PQueue = PQueueModule.default;

const queue = new PQueue({
  concurrency: 1,
  interval: 3000,
  intervalCap: 1,
});

module.exports = queue;
