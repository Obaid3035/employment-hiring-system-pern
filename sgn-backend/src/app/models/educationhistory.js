const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class educationHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      educationHistory.belongsTo(models.ApplicationForm);
    }
  }
  educationHistory.init({
    schoolType: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    schoolAddress: DataTypes.STRING,
    schoolZipCode: DataTypes.STRING,
    yearsCompleted: DataTypes.STRING,
    isGraduate: DataTypes.BOOLEAN,
    schoolDegree: DataTypes.STRING,
    applicationFormId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'educationHistory',
  });
  return educationHistory;
};
