module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('educationHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      schoolType: {
        type: Sequelize.STRING,
      },
      schoolName: {
        type: Sequelize.STRING,
      },
      schoolAddress: {
        type: Sequelize.STRING,
      },
      schoolZipCode: {
        type: Sequelize.STRING,
      },
      yearsCompleted: {
        type: Sequelize.STRING,
      },
      isGraduate: {
        type: Sequelize.BOOLEAN,
      },
      schoolDegree: {
        type: Sequelize.STRING,
      },
      applicationFormId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'applicationForms',
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
    await queryInterface.dropTable('educationHistories');
  },
};
