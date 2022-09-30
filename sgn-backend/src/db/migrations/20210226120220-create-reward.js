module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rewards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      limit: {
        type: Sequelize.INTEGER,
      },
      winner: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('onGoing', 'Completed'),
        defaultValue: 'onGoing',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rewards');
  },
};
