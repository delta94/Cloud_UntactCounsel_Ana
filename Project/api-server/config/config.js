const production = {
  DATABASE: {
    host: "localhost",
    port: "5432",
    user: "ana",
    password: "anasis2",
    database: "anadb",
    dialect: "postgres",
    timezone: "+09:00",
  },
  SESSION_SECRET: "ThisIsReallySecret",
  API_PORT: 80,
  JWT_SECRET: "q",
};

const development = {
  DATABASE: {
    host: "localhost",
    port: "5432",
    user: "ana",
    password: "anasis2",
    database: "anadb",
    dialect: "postgres",
    timezone: "+09:00",
  },
  SESSION_SECRET: "ThisIsMySecret",
  API_PORT: 8080,
  JWT_SECRET: "q",
};

module.exports =
  process.env.NODE_ENV == "production" ? production : development;
