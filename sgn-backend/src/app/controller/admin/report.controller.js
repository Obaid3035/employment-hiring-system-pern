import { Op } from 'sequelize';
import {
  User, ApplicationForm, NoticeOfIntent, sequelize,
} from '../../../../index';

class AdminReportController {
  async getReport(req, res, next) {
    const { user } = req.query;
    const { startDate } = req.query;
    const { endDate } = req.query;
    const appForm = await ApplicationForm.findOne({
      where: { firstName: user, applicationStatus: 'Active' },
      attributes: ['id', 'firstName', 'UserId'],
      include: {
        model: User,
        attributes: ['id'],
      },
    });
    if (appForm) {
      const completedTask = await NoticeOfIntent.findAll({
        where: {
          UserId: appForm.User.id,
          status: 'completed',
          createdAt: {
            [Op.between]: [`${startDate} 00:00:00`, `${endDate} 00:00:00`],
          },
        },
      });// rmE691a

      const underReviewTask = await NoticeOfIntent.findAll({
        where: {
          UserId: appForm.User.id,
          status: 'underReview',
          createdAt: {
            [Op.between]: [`${startDate} 00:00:00`, `${endDate} 00:00:00`],
          },
        },
      });

      const approvedTask = await NoticeOfIntent.findAll({
        where: {
          UserId: appForm.User.id,
          status: 'approved',
          createdAt: {
            [Op.between]: [`${startDate} 00:00:00`, `${endDate} 00:00:00`],
          },
        },
      });

      const commisionedTask = await NoticeOfIntent.findAll({
        where: {
          UserId: appForm.User.id,
          status: 'commissioned',
          createdAt: {
            [Op.between]: [`${startDate} 00:00:00`, `${endDate} 00:00:00`],
          },
        },
      });
      res.status(200).json({
        completedTask, underReviewTask, approvedTask, commisionedTask,
      });
    } else {
      res.status(200).json('User Not Found');
    }
  }
}

export default AdminReportController;
