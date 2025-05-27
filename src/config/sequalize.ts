import { Sequelize } from "sequelize";
import { config } from "./config";
const sequelize = new Sequelize(
  config.databaseName,
  config.databaseUsername,
  config.databasePassword,
  {
    host: config.databaseHost,
    dialect: "mysql",
  }
);

export default sequelize;
