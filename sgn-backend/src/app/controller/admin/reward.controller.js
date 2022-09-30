import { Op } from 'sequelize';
import {
  Reward, User, ApplicationForm, NoticeOfIntent, UserReward,
} from '../../../../index';

class AdminRewardController {
  async index(req, res, next) {
    try {
      const onGoingReward = await Reward.findAll({
        where: { status: 'onGoing' },
      });

      const completedReward = await Reward.findAll({
        where: { status: 'Completed' },
      });

      res.status(200).json({ onGoingReward, completedReward });
    } catch (e) {
      next(e);
    }
  }

  async changeRewardStatus(req, res, next) {
    try {
      const { id } = req.params;
      const reward = await Reward.findOne({
        where: { id },
      });
      reward.status = 'Completed';
      await reward.save();
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { user } = req.body;
      let employee;
      const reward = await Reward.create({ ...req.body, status: 'onGoing' });
      for (const i of user) {
        employee = await ApplicationForm.findOne({
          where: { firstName: i },
          include: User,
        });
        await UserReward.create({ UserId: employee.User.id, rewardId: reward.id });
      }
      res.status(200).json({ saved: 'SuccessFully Created' });
    } catch (e) {
      next(e);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const reward = await Reward.findOne({
        where: { id },
      });
      const user = await User.findAll({
        attributes: ['id'],
        include: [
          {
            model: Reward,
            attributes: ['id'],
            required: true,
            where: { id },
          },
          {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
          {
            model: NoticeOfIntent,
            attributes: ['points', 'status'],
            required: false,
            where: { status: 'completed' },
          },
        ],
      });
      console.log(user);
      const employee = user.map((i) => ({
        id: i.id,
        firstName: i.applicationForm.firstName,
        totalPoint: i.noticeOfIntents.reduce((acc, val) => acc + val.points, 0),
      }));
      employee.sort((a, b) => a.totalPoint - b.totalPoint);
      console.log(reward);
      res.status(200).send({ employee, reward });
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const reward = await Reward.findByPk(id);
      await reward.update(req.body);
      res.status(200).json('Successfully Updated');
    } catch (e) {
      next(e);
    }
  }

  //  rewardId: null,
  async getUserBySubAdmin(req, res, next) {
    try {
      const { user } = req;
      const users = await ApplicationForm.findAll({
        attributes: ['id', 'firstName'],
        where: { id: user.applicationFormId },
      });
      const updatedUser = users.map((i) => ({
        label: i.firstName,
        value: i.id,
      }));
      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: ['roles', 'id'],
        where: {
          roles: { [Op.contains]: ['employee'] },
        },
        include: {
          model: ApplicationForm,
          where: { applicationStatus: { [Op.ne]: 'inActive' } },
          attributes: ['firstName'],
        },
      });

      const updatedUser = users.map((i) => i.applicationForm.firstName);
      console.log('USERRRR', updatedUser);
      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
}

export default AdminRewardController;
