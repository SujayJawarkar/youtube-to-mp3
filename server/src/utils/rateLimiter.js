const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  minTime: 2000,
  maxConcurrent: 1,
});

module.exports = limiter;
