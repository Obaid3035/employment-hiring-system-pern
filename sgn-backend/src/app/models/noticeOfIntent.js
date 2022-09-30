const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class noticeOfIntent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      noticeOfIntent.belongsTo(models.User);
      // define association here
    }
  }
  noticeOfIntent.init({
    businessName: DataTypes.STRING,
    potential: DataTypes.STRING,
    planOnGoing: DataTypes.DATE,
    status: DataTypes.ENUM('underReview', 'successful', 'unSuccessful', 'inProgress','commissioned', 'approved', 'completed'),
    businessPhoneNumber: DataTypes.STRING,
    additionalInformation: DataTypes.STRING,
    points: DataTypes.INTEGER,
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
    modelName: 'noticeOfIntent',
  });
  return noticeOfIntent;
};
