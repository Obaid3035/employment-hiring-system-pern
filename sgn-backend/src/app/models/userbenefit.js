const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBenefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBenefit.belongsTo(models.User);
      UserBenefit.belongsTo(models.Benefit);
    }
  }
  UserBenefit.init({
    UserId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    benefitId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: true,
      references: {
        model: 'benefits',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'UserBenefit',
  });
  return UserBenefit;
};
