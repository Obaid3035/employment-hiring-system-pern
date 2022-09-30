module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employmentHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employerName: {
        type: Sequelize.STRING,
      },
      telephoneName: {
        type: Sequelize.STRING,
      },
      businessType: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      zipCode: {
        type: Sequelize.STRING,
      },
      employmentLength: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      reasonOfLeaving: {
        type: Sequelize.STRING,
      },
      currentlyEmployed: {
        type: Sequelize.STRING,
      },
      contactEmployer: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('employmentHistories');
  },
};
