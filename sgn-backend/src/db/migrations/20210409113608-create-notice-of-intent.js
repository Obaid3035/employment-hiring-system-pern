module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('noticeOfIntents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      businessName: {
        type: Sequelize.STRING,
      },
      potential: {
        type: Sequelize.STRING,
      },
      planOnGoing: {
        type: Sequelize.DATE,
      },
      businessPhoneNumber: {
        type: Sequelize.STRING,
      },
      additionalInformation: {
        type: Sequelize.STRING,
      },
      points: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('underReview', 'successful', 'inProgress','unSuccessful', 'commissioned', 'approved', 'completed'),
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
    await queryInterface.dropTable('noticeOfIntents');
  },
};
