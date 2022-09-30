import { Model } from 'sequelize';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  BadRequest, UnAuthorized,
} from '../../lib/errorCode';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async generateAuthToken() {
      const user = this;
      const token = await sign({ _id: user.id }, process.env.JWT_SECRET);
      await user.save();
      return token;
    }

    static async userExist(email) {
      if (!email) {
        throw new UnAuthorized('Please enter email or password');
      }
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new BadRequest('User already Exist');
      }
      return true;
    }

    static async findByCredentials(email, password) {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new UnAuthorized('Unable to login');
      }
      // if (!user.confirmedAt) {
      //   throw new UnAuthorized('Please verify the account first!');
      // }
      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        throw new UnAuthorized('Email or Password is incorrect');
      }
      return user;
    }

    static associate(models) {
      // define association here
      User.hasOne(models.ApplicationForm);
      User.hasOne(models.RoleDetail);
      User.hasMany(models.NoticeOfIntent);
      User.hasOne(models.Resume);
      User.hasMany(models.Contract);
      User.hasMany(models.Payment);
      User.hasMany(models.Notification);
      User.belongsToMany(models.Reward, { through: models.UserReward });
      User.belongsToMany(models.Benefit, { through: models.UserBenefit });
      User.hasMany(models.Message, { foreignKey: 'senderId' });
      User.hasMany(models.Message, { foreignKey: 'receiverId' });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('Enabled', 'Disabled'),
      defaultValue: 'Enabled',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    applicationFormId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    uniqueID: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
