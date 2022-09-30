import { Notification } from '../../../../index';

class AdminNotificationController {
  async index(req, res, next) {
    try {
      let updatedNotification;
      const notification = await Notification.findAll({
        where: { status: 'unRead' },
        limit: 10,
      });
      if (notification) {
        updatedNotification = notification.map((i) => ({
          id: i.id,
          image: 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg',
          message: i.description,
          detailPage: '#',
          receivedTime: i.createdAt,
        }));
      }
      res.status(200).json(updatedNotification);
    } catch (e) {
      next(e);
    }
  }

  async makeRead(req, res, next) {
    try {
      for (const arr of req.body) {
        const notification = await Notification.findOne({
          where: { id: arr.id },
        });
        notification.status = 'read';
        await notification.save();
      }
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const notification = await Notification.create(req.body);
      res.status(200).json(notification);
    } catch (e) {
      next(e);
    }
  }
}

export default AdminNotificationController;
