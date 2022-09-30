const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      file.belongsTo(models.Quote);
    }
  }
  file.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    data: {
      type: DataTypes.BLOB('long'),
    },
  }, {
    sequelize,
    modelName: 'file',
  });
  return file;
};
