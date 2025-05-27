import sequelize from "../../config/sequalize";

const setupTestDB = () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Create tables and clear DB
  });

  beforeEach(async () => {
    // Truncate all tables
    for (const modelName of Object.keys(sequelize.models)) {
      await sequelize.models[modelName].destroy({
        where: {},
        force: true,
        truncate: true,
        restartIdentity: true,
      });
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });
};

module.exports = setupTestDB;
