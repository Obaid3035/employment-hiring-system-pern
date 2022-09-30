module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('applicationForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      notes: Sequelize.STRING,
      referralID: Sequelize.INTEGER,
      applicationStatus: {
        type: Sequelize.ENUM('underReview', 'Hired', 'Active', 'inActive', 'Decline'),
        defaultValue: 'underReview',
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      middleName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      streetAddress: {
        type: Sequelize.STRING,
      },
      zipCode: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      workedForSGN: {
        type: Sequelize.BOOLEAN,
      },
      workedForSGNExplain: {
        type: Sequelize.STRING,
      },
      haveAnyFriendsAtSGN: {
        type: Sequelize.BOOLEAN,
      },
      haveAnyFriendAtSGNName: {
        type: Sequelize.STRING,
      },
      overAge: {
        type: Sequelize.BOOLEAN,
      },
      presentYourIdentificationCard: {
        type: Sequelize.BOOLEAN,
      },
      pleadedFelony: {
        type: Sequelize.BOOLEAN,
      },
      pleadedFelonyExplain: {
        type: Sequelize.STRING,
      },
      desiredSalary: {
        type: Sequelize.STRING,
      },
      partTimeWork: {
        type: Sequelize.BOOLEAN,
      },
      fullTimeWork: {
        type: Sequelize.BOOLEAN,
      },
      daysAvailable: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      timeRangeAvailableFrom: {
        type: Sequelize.TIME,
      },
      timeRangeAvailableTo: {
        type: Sequelize.TIME,
      },
      startWorkingDate: {
        type: Sequelize.DATE,
      },
      essentialFunction: {
        type: Sequelize.BOOLEAN,
      },
      essentialFunctionExplain: {
        type: Sequelize.STRING,
      },
      certificate: {
        type: Sequelize.STRING,
      },
      isForeignLanguage: {
        type: Sequelize.STRING,
      },
      foreignLanguage: {
        type: Sequelize.STRING,
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
      jobListingId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'jobListings',
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
    await queryInterface.dropTable('applicationForms');
  },
};
