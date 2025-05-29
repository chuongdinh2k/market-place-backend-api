import app from "./app";
import { logger } from "./config/logger";
import { config } from "./config/config";
import sequelize from "./config/sequalize";
import { initUserModel } from "./models/user.model";
import { initCategoryModel } from "./models/category.model";
import { initSizeModel } from "./models/size.model";
import { initColorModel } from "./models/color.model";

// eslint-disable-next-line prefer-const
let server: ReturnType<typeof app.listen> | undefined;

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connected to the database");
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((err: Error) => {
    logger.error("Unable to connect to the database:", err);
    process.exit(1);
  });

initUserModel(sequelize);
initCategoryModel(sequelize);
initSizeModel(sequelize);
initColorModel(sequelize);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
