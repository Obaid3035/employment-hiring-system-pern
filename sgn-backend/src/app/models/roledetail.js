const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class roleDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roleDetail.belongsTo(models.User);
    }
  }
  roleDetail.init({
    subAdmin: {
      type: DataTypes.BOOLEAN,
    },
    employee: {
      type: DataTypes.BOOLEAN,
    },
    project: {
      type: DataTypes.BOOLEAN,
    },
    job: {
      type: DataTypes.BOOLEAN,
    },
    application: {
      type: DataTypes.BOOLEAN,
    },
    quote: {
      type: DataTypes.BOOLEAN,
    },
    benefit: {
      type: DataTypes.BOOLEAN,
    },
    payment: {
      type: DataTypes.BOOLEAN,
    },
    toDoList: {
      type: DataTypes.BOOLEAN,
    },
    chat: {
      type: DataTypes.BOOLEAN,
    },
    noticeOfIntent: {
      type: DataTypes.BOOLEAN,
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
    modelName: 'roleDetail',
  });
  return roleDetail;
};
