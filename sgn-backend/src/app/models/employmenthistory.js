const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class employmentHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employmentHistory.belongsTo(models.ApplicationForm);
    }
  }
  employmentHistory.init({
    employerName: DataTypes.STRING,
    telephoneName: DataTypes.STRING,
    businessType: DataTypes.STRING,
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    employmentLength: DataTypes.STRING,
    salary: DataTypes.STRING,
    position: DataTypes.STRING,
    reasonOfLeaving: DataTypes.STRING,
    currentlyEmployed: DataTypes.STRING,
    contactEmployer: DataTypes.BOOLEAN,
    applicationFormId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'employmentHistory',
  });
  return employmentHistory;
};
