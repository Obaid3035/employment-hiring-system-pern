const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contract.belongsTo(models.User);
    }
  }
  contract.init({
    status: DataTypes.STRING,
    data: {
      type: DataTypes.BLOB('long'),
    },
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
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
    modelName: 'contract',
  });
  return contract;
};
