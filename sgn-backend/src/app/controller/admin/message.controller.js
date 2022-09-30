import { Op } from 'sequelize';
import {
  ApplicationForm, Message, Reward, User, UserReward,
} from '../../../../index';

class AdminMessageController {
  async allMessage(req, res, next) {
    try {
      const { user } = req;
      const messages = await Message.findAll({
        where: { receiverId: user.id },
        include: {
          model: User,
          as: 'sender',
        },
      });
      res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }

  async sendMessage(req, res, next) {
    try {
      const { user } = req;
      const { userName, message } = req.body;
      console.log(userName);
      const { id } = req.params;
      let employee;
      for (const i of userName) {
        employee = await ApplicationForm.findOne({
          where: { id: i.value },
          include: User,
        });
        await Message.create({ senderId: user.id, receiverId: employee.User.id, message });
      }
      res.status(200).json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async adminReplyMessage(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      const { message } = req.body;
      await Message.create({ senderId: user.id, receiverId: id, message });

      res.status(200).json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async replyMessageBySubAdmin(req, res, next) {
    try {
      const { user } = req;
      const { message, wholeChat } = req.body;
      await Message.create({ senderId: user.id, receiverId: wholeChat, message });
      res.status(200).json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async helpMessageBySubadmin(req, res, next) {
    try {
      const { user } = req;
      const { message } = req.body;
      const application = await ApplicationForm.findOne({
        where: {
          UserId: user.id,
        },
        attributes: ['id'],
      });
      const subadmin = await User.findOne({
        where: { applicationFormId: { [Op.contains]: application.id } },
      });
      console.log('HELLO', subadmin);
      await Message.create({ senderId: user.id, receiverId: subadmin.id, message });
      res.status(200).json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async replyMessage(req, res, next) {
    try {
      const { user } = req;
      console.log(user.id);
      const { message } = req.body;
      const allApplications = await ApplicationForm.findAll();
      console.log(allApplications);
      const application = await ApplicationForm.findOne({
        where: {
          UserId: user.id,
        },
        attributes: ['id'],
      });

      console.log(application);

      const subadmin = await User.findOne({
        where: { applicationFormId: { [Op.contains]: [application.id] } },
      });

      if (subadmin) {
        await Message.create({ senderId: user.id, receiverId: subadmin.id, message });
      } else {
        const admin = await User.findAll({
          where: { roles: { [Op.contains]: ['admin'] } },
        });
        for (const i of admin) {
          await Message.create({ senderId: user.id, receiverId: i.id, message });
        }
      }

      res.status(200).json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getChatUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: ['roles', 'id'],
        where: {
          roles: { [Op.contains]: ['employee'] },
        },
        include: {
          model: ApplicationForm,
          where: { applicationStatus: { [Op.ne]: 'inActive' } },
          attributes: ['id', 'firstName'],
        },
      });

      const updatedUser = users.map((i) => ({
        label: i.applicationForm.firstName,
        value: i.applicationForm.id,
      }));
      console.log('USERRRR', updatedUser);
      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
}

export default AdminMessageController;
