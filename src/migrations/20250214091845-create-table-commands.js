'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('commands', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name_command: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      response_command: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tele_constructor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TeleConstructor', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      token_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tokens', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('commands');
  },
};

