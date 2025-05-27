/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
require("ts-node/register");
require("dotenv").config();

module.exports = {
  // username: configs.databaseUsername,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
  port: process.env.DATABASE_PORT || 3306,
};
