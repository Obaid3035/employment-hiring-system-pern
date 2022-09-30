module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roleDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      employee: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      project: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      job: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      application: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      quote: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      benefit: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      payment: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      toDoList: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      chat: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      noticeOfIntent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
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
    await queryInterface.dropTable('roleDetails');
  },
};
