const production = {
  API_URL: "https://220.94.42.246:8080/api",
};

const development = {
  API_URL: "http://220.94.42.246:8080/api",
};

module.exports =
  process.env.NODE_ENV === "production" ? production : development;
