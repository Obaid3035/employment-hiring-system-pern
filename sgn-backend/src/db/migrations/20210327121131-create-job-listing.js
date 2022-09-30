module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobListings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobStatus: {
        type: Sequelize.ENUM('Active', 'inActive'),
        defaultValue: 'Active',
        allowNull: false,
      },
      jobCountry: {
        type: Sequelize.STRING,
      },
      jobState: {
        type: Sequelize.STRING,
      },
      jobCity: {
        type: Sequelize.STRING,
      },
      jobTitle: {
        type: Sequelize.STRING,
      },
      jobDescription: {
        type: Sequelize.STRING,
      },
      jobBenefit: {
        type: Sequelize.STRING,
      },
      jobRequirement: {
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
    await queryInterface.dropTable('jobListings');
  },
};
