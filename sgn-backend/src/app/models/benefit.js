const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class benefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      benefit.belongsToMany(models.User, { through: models.UserBenefit });
    }
  }
  benefit.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    assigned: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'benefit',
  });
  return benefit;
};
