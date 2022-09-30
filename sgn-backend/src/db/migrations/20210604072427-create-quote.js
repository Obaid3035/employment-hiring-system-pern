module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      companyAddress: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      bestOption: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      productName: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.STRING,
      },
      pricePerUnit: {
        type: Sequelize.STRING,
      },
      howSoon: {
        type: Sequelize.STRING,
      },
      checkAddress: {
        type: Sequelize.BOOLEAN,
      },
      Address: {
        type: Sequelize.STRING,
      },
      timeToReach: {
        type: Sequelize.TIME,
      },
      lastInteractive: {
        type: Sequelize.STRING,
      },
      representative: {
        type: Sequelize.STRING,
      },
      recommend: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('quotes');
  },
};
