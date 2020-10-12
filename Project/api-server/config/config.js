const production = {
  DATABASE: {
    host: "anoldstory.net",
    port: "3306",
    user: "admin",
    password: "password",
    database: "database_name",
    dialect: "mysql",
    timezone: "+09:00",
  },
  SESSION_SECRET: "ThisIsReallySecret",
  API_PORT: 80,
};

const development = {
  DATABASE: {
    host: "anoldstory.net",
    port: "3306",
    user: "admin",
    password: "password",
    database: "database_name",
    dialect: "mysql",
    timezone: "+09:00",
  },
  SESSION_SECRET: "ThisIsMySecret",
  API_PORT: 3001,
};

module.exports = process.env.NODE_ENV == "production" ? production : development;
