const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class applicationForm extends Model {
    static associate(models) {
      // define association here
      applicationForm.hasMany(models.EducationHistory);
      applicationForm.hasMany(models.EmploymentHistory);
      applicationForm.hasMany(models.Reference);
      applicationForm.belongsTo(models.JobListing);
      applicationForm.belongsTo(models.User);
    }
  }
  applicationForm.init({
    referralID: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    applicationStatus: {
      type: DataTypes.ENUM('underReview', 'Hired', 'Active', 'inActive', 'Decline'),
      defaultValue: 'underReview',
      allowNull: false,
    },
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    workedForSGN: DataTypes.BOOLEAN,
    workedForSGNExplain: DataTypes.STRING,
    haveAnyFriendsAtSGN: DataTypes.BOOLEAN,
    haveAnyFriendAtSGNName: DataTypes.STRING,
    overAge: DataTypes.BOOLEAN,
    presentYourIdentificationCard: DataTypes.BOOLEAN,
    pleadedFelony: DataTypes.BOOLEAN,
    pleadedFelonyExplain: DataTypes.STRING,
    desiredSalary: DataTypes.INTEGER,
    partTimeWork: DataTypes.BOOLEAN,
    fullTimeWork: DataTypes.BOOLEAN,
    daysAvailable: DataTypes.ARRAY(DataTypes.STRING),
    timeRangeAvailableFrom: DataTypes.TIME,
    timeRangeAvailableTo: DataTypes.TIME,
    startWorkingDate: DataTypes.DATE,
    essentialFunction: DataTypes.BOOLEAN,
    essentialFunctionExplain: DataTypes.STRING,
    certificate: DataTypes.STRING,
    foreignLanguage: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    jobListingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'applicationForm',
  });
  return applicationForm;
};
