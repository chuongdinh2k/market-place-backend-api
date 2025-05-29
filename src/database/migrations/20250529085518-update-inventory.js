/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add index for productId
    await queryInterface.addIndex("inventories", ["product_id"], {
      name: "idx_inventories_productId",
    });
    // Add index for storeId
    await queryInterface.addIndex("inventories", ["store_id"], {
      name: "idx_inventories_storeId",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove index for productId
    await queryInterface.removeIndex(
      "inventories",
      "idx_inventories_productId"
    );
    // Remove index for storeId
    await queryInterface.removeIndex("inventories", "idx_inventories_storeId");
  },
};
