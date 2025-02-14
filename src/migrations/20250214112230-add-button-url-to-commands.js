'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('commands', 'button_url', {
      type: Sequelize.STRING,
      allowNull: true,    
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('commands', 'button_url');
  },
};

