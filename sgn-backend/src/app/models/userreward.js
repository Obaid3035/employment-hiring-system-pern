const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserReward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserReward.belongsTo(models.User);
      UserReward.belongsTo(models.Reward);
    }
  }
  UserReward.init({
    UserId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    rewardId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: true,
      references: {
        model: 'rewards',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'UserReward',
  });
  return UserReward;
};
