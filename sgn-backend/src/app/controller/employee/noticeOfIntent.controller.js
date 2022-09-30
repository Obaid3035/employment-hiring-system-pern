import { Op } from 'sequelize';
import {
  NoticeOfIntent, User, ApplicationForm, Notification,
} from '../../../../index';

class EmployeeNoticeOfIntentController {
  async notice(req, res, next) {
    try {
      const { user } = req;
      const noticeOfIntent = await NoticeOfIntent.findAll({
        where: { UserId: user.id, status: 'underReview' },
      });
      res.status(200);
      res.json(noticeOfIntent);
    } catch (e) {
      next(e);
    }
  }

  async addNotice(req, res, next) {
    try {
      console.log('hello');
      const { user } = req;
      req.body.UserId = user.id;
      req.body.status = 'underReview';
      const noticeOfIntent = await NoticeOfIntent.create(req.body);
      await Notification.create({ description: `${user.email} has created notice`, UserId: user.id });
      res.status(200).json(noticeOfIntent);
    } catch (e) {
      next(e);
    }
  }

  async approved(req, res, next) {
    try {
      const { user } = req;
      const noticeOfIntent = await NoticeOfIntent.findAll({
        where: { status: 'approved', UserId: user.id },
      });
      res.status(200).json(noticeOfIntent);
    } catch (e) {
      next(e);
    }
  }

  async toSuccessFull(req, res, next) {
    try {
      const { id } = req.params;
      const { user } = req;
      const noticeOfIntent = await NoticeOfIntent.findByPk(id);
      noticeOfIntent.status = 'successful';
      await Notification.create({ description: `${user.email} has completed Notice Of Intent`, UserId: user.id });
      await noticeOfIntent.save();
      res.status(200).json('successfully Updated');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async project(req, res, next) {
    try {
      const { user } = req;
      const SuccessNotice = await NoticeOfIntent.findAll({
        where: {
          [Op.or]: [
            {
              UserId: user.id, status: 'completed',
            },
            {
              UserId: user.id, status: 'inProgress',
            },
          ],
        },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });

      const CommissionedNotice = await NoticeOfIntent.findAll({
        where: { UserId: user.id, status: 'commissioned' },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });

      res.status(200).json({ SuccessNotice, CommissionedNotice });
    } catch (e) {
      next(e);
    }
  }
}

export default EmployeeNoticeOfIntentController;
