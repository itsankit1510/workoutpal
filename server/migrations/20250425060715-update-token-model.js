'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Step 1: Remove the ENUM constraint
    await queryInterface.changeColumn('tokens', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'access'
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert back to ENUM if needed
    await queryInterface.changeColumn('tokens', 'type', {
      type: Sequelize.ENUM('access', 'refresh'),
      allowNull: false,
      defaultValue: 'access'
    });
  }
};
