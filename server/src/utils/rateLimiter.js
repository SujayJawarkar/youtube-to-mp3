const Bottleneck = require("bottleneck");

// Max 1 request every 2 seconds
const limiter = new Bottleneck({
  minTime: 2000,
  maxConcurrent: 1,
});

module.exports = limiter;
