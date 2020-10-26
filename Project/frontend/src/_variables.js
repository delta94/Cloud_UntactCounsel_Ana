const production = {
  API_URL: "https://220.94.42.246:8080/api",
  Socket_URL: "http://220.94.42.246:8080",
};

const development = {
  API_URL: "http://220.94.42.246:8080/api",
  Socket_URL: "http://220.94.42.246:8080",
};

module.exports =
  process.env.NODE_ENV === "production" ? production : development;
