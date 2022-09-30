const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      resume.belongsTo(models.User);
    }
  }
  resume.init({
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
    modelName: 'resume',
  });
  return resume;
};
