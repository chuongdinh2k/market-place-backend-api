/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add unique constraint for product_id, store_id, color_id, size_id
    await queryInterface.addConstraint("inventories", {
      fields: ["product_id", "store_id", "color_id", "size_id"],
      type: "unique",
      name: "unique_inventory_combination",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the unique constraint
    await queryInterface.removeConstraint(
      "inventories",
      "unique_inventory_combination"
    );
  },
};
