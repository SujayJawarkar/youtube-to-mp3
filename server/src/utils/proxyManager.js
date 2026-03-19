const proxies = process.env.PROXIES ? process.env.PROXIES.split(",") : [];

let currentIndex = 0;

const getProxy = () => {
  if (proxies.length === 0) return null;

  const proxy = proxies[currentIndex];
  currentIndex = (currentIndex + 1) % proxies.length; // rotate
  return proxy;
};

module.exports = { getProxy };
