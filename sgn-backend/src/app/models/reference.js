const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reference.belongsTo(models.ApplicationForm);
      // define association here
    }
  }
  reference.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    occupation: DataTypes.STRING,
    yearsAcquainted: DataTypes.STRING,
    applicationFormId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'reference',
  });
  return reference;
};
