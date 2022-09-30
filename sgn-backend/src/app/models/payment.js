const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.belongsTo(models.User);
    }
  }
  payment.init({
    description: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB('long'),
    },
    UserId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};
