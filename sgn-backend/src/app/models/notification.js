const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notification.belongsTo(models.User);
    }
  }
  notification.init({
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('read', 'unRead'),
      defaultValue: 'unRead',
    },
    UserId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};
