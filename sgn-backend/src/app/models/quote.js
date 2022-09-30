const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quote.hasOne(models.File);
    }
  }
  quote.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyName: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    bestOption: DataTypes.STRING,
    industry: DataTypes.STRING,
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    pricePerUnit: DataTypes.INTEGER,
    howSoon: DataTypes.STRING,
    checkAddress: DataTypes.BOOLEAN,
    Address: DataTypes.STRING,
    timeToReach: DataTypes.TIME,
    representative: {
      type: DataTypes.STRING,
    },
    recommend: {
      type: DataTypes.STRING,
    },
    lastInteractive: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'quote',
  });
  return quote;
};
