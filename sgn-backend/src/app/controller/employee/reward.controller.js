import {
  Reward, User, NoticeOfIntent, UserReward,
} from '../../../../index';

class EmployeeRewardController {
  async getReward(req, res, next) {
    try {
      const { id } = req.params;
      const { user } = req;
      // const rewardData = await Reward.findOne({
      //   where: { id },
      //   attributes: ['id'],
      //   include: [
      //     {
      //       model: Reward,
      //       attributes: ['limit'],
      //       required: false,
      //     },
      //     {
      //       model: NoticeOfIntent,
      //       attributes: ['points', 'status'],
      //       where: { status: 'completed' },
      //       required: false,
      //     },
      //   ],
      // });
      // let reward;
      // if (rewardData.reward.limit) {
      //   reward = {
      //     limit: rewardData.reward.limit,
      //     totalPoints: rewardData.noticeOfIntents.reduce((acc, val) => acc + val.points, 0),
      //   };
      // }
      // if (reward.limit) {
      //   if (reward.totalPoints >= reward.limit) {
      //     res.status(200).json({ winner: true });
      //   }
      // }

      const reward = await UserReward.findOne({
        where: { UserId: user.id, rewardId: id },
        include: [
          {
            model: User,
            attributes: ['id'],
            include: {
              model: NoticeOfIntent,
              attributes: ['points', 'status'],
              required: false,
              where: { status: 'completed' },
            },
          },
          {
            model: Reward,
          },
        ],
      });
      let totalPoints = 0;
      if (reward.User.noticeOfIntents.length > 0) {
        totalPoints = reward.User.noticeOfIntents.reduce((acc, val) => acc + val.points, 0);
      }

      res.status(200).json({ reward, totalPoints });
    } catch (e) {
      next(e);
    }
  }

  async allReward(req, res, next) {
    try {
      const { user } = req;

      const rewards = await User.findOne({
        where: { id: user.id },
        include: [
          {
            model: Reward,
            through: {
              model: UserReward,
            },
          },
          {
            model: NoticeOfIntent,
            attributes: ['points', 'status'],
            where: { status: 'completed' },
            required: false,
          },
        ],
      });

      console.log(rewards);

      let totalPoints = 0;
      if (rewards.noticeOfIntents.length > 0) {
        totalPoints = rewards.noticeOfIntents.reduce((acc, val) => acc + val.points, 0);
      }
      for (const i of rewards.rewards) {
        if (totalPoints >= i.limit) {
          const reward = await Reward.findOne({
            where: { id: i.id },
          });
          reward.status = 'Completed';
          await reward.save();
        }
      }
      res.status(200).json({ rewards, totalPoints });
    } catch (e) {
      next(e);
    }
  }

  async getCompleted(req, res, next) {
    try {
      const { user } = req;
      const project = await NoticeOfIntent.findAll({
        where: { UserId: user.id, status: 'completed' },
      });
      res.status(200).json(project);
    } catch (e) {
      next(e);
    }
  }
}

export default EmployeeRewardController;
