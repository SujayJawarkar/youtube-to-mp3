// You can get free proxies from https://www.webshare.io (free tier = 10 proxies)
// Or use any proxy provider and add them here
const proxies = process.env.PROXIES ? process.env.PROXIES.split(",") : [];

let currentIndex = 0;

const getProxy = () => {
  if (proxies.length === 0) return null;

  const proxy = proxies[currentIndex];
  currentIndex = (currentIndex + 1) % proxies.length; // rotate
  return proxy;
};

module.exports = { getProxy };
