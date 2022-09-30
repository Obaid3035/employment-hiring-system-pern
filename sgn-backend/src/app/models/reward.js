const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reward.belongsToMany(models.User, { through: models.UserReward });
    }
  }
  reward.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    limit: DataTypes.INTEGER,
    winner: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('onGoing', 'Completed'),
      defaultValue: 'onGoing',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'reward',
  });
  return reward;
};
