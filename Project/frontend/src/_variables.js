const production = {
  API_URL: "https://anoldstory.net/api",
};

const development = {
  API_URL: "http://locahost:3001/api",
};

module.exports = process.env.NODE_ENV === "production" ? production : development;
