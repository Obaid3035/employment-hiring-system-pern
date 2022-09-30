import { Op } from 'sequelize';
import { application } from 'express';
import {
  ApplicationForm, User, NoticeOfIntent,
} from '../../../../index';

class AdminNoticeOfIntentController {
  async noticeOfIntentBySubAdmin(req, res, next) {
    try {
      const { user } = req;
      console.log(user.applicationFormId);
      const noticeOfIntent = await ApplicationForm.findAll({
        attributes: ['firstName'],
        where: {
          id: user.applicationFormId,
        },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: NoticeOfIntent,
            where: {
              [Op.or]: [
                {
                  status: 'approved',
                },
                {
                  status: 'underReview',
                },
              ],
            },
            required: true,
          },
        },
      });

      const noticeOfIntents = [];
      const result = [];

      noticeOfIntent.forEach((notice) => {
        if (notice.User && notice.User.noticeOfIntents) {
          notice.User.noticeOfIntents.forEach((n) => {
            noticeOfIntents.push({
              ...n.dataValues,
              User: {
                applicationForm: {
                  firstName: notice.firstName,
                },
              },
            });
          });
          // noticeOfIntents.forEach((obj) => {
          //   console.log('NOTICE', obj);
          //   result.push({
          //     ...obj.dataValues,
          //     User: {
          //       applicationForm: {
          //         firstName: notice.firstName,
          //       },
          //     },
          //   });
          // });
        }
      });
      // console.log('HELLLOO', result[0].dataValues);
      res.status(200).json({ result: noticeOfIntents });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async index(req, res, next) {
    try {
      const noticeOfIntent = await NoticeOfIntent.findAll({
        where: {
          [Op.or]: [
            {
              status: 'approved',
            },
            {
              status: 'underReview',
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
      res.status(200).json(noticeOfIntent);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  // obaid12@gmail.com
  // d7Ai6IJ

  async AllUserBySubAdmin(req, res, next) {
    try {
      const { user } = req;

      const applicationForms = await ApplicationForm.findAll({
        where: { id: user.applicationFormId },
        attributes: ['firstName'],
      });
      const updated = applicationForms.map((i) => ({
        value: i.firstName,
        label: i.firstName,
      }));
      res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async AllUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: ['id'],
        where: { roles: { [Op.contains]: ['employee'] } },
        include: {
          model: ApplicationForm,
          where: { applicationStatus: { [Op.ne]: 'inActive' } },
          attributes: ['firstName'],
        },
      });
      const updated = users.map((i) => ({
        value: i.applicationForm.firstName,
        label: i.applicationForm.firstName,
      }));
      console.log(updated);
      res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      console.log(req.body);
      const { users } = req.body;
      const applicationForm = await ApplicationForm.findOne({
        where: { firstName: users },
        include: [User],
      });
      req.body.UserId = applicationForm.User.id;
      req.body.status = 'approved';
      await NoticeOfIntent.create(req.body);
      res.status(200).json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const noticeOfIntent = await NoticeOfIntent.findByPk(id);
      if (req.body.points) {
        noticeOfIntent.points = req.body.points;
      }
      noticeOfIntent.status = 'approved';
      await noticeOfIntent.save();
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async approved(req, res, next) {
    try {
      const noticeOfIntent = await NoticeOfIntent.findAll({
        where: { status: 'approved' },
        attributes: ['id', 'businessName', 'status'],
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      res.json(noticeOfIntent);
    } catch (e) {
      next(e);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const noticeOfIntent = await NoticeOfIntent.findOne({
        where: { id },
        attributes: ['businessName', 'potential', 'planOnGoing', 'businessPhoneNumber', 'additionalInformation', 'points', 'status'],
      });
      res.json(noticeOfIntent);
    } catch (e) {
      next(e);
    }
  }

  async successfullBySubAdmin(req, res, next) {
    try {
      const { user } = req;
      const noticeOfIntent = await ApplicationForm.findAll({
        attributes: ['firstName'],
        where: {
          id: user.applicationFormId,
        },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: NoticeOfIntent,
            where: {
              [Op.or]: [
                {
                  status: 'approved',
                },
                {
                  status: 'successful',
                },
              ],
            },
            required: true,
          },
        },
      });

      const noticeOfIntents = [];
      const result = [];
      noticeOfIntent.forEach((notice, index) => {
        if (notice.User && notice.User.noticeOfIntents) {
          notice.User.noticeOfIntents.forEach((n) => {
            noticeOfIntents.push({
              ...n.dataValues,
              User: {
                applicationForm: {
                  firstName: notice.firstName,
                },
              },
            });
          });
          // noticeOfIntents.forEach((obj) => {
          //   console.log(index, obj.dataValues.id);
          //   result.push({
          //     ...obj.dataValues,
          //     User: {
          //       applicationForm: {
          //         firstName: notice.firstName,
          //       },
          //     },
          //   });
          // });
        }
      });
      console.log(noticeOfIntents);
      // console.log('HELLLOO', result[0]);
      res.status(200).json({ result: noticeOfIntents });
    } catch (e) {
      next(e);
    }
  }

  async successfull(req, res, next) {
    try {
      const successIntent = await NoticeOfIntent.findAll({
        where: {
          [Op.or]: [
            { status: 'successful' },
            { status: 'approved' },
          ],
        },
        attributes: ['id', 'businessName', 'status', 'planOnGoing', 'points'],
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      res.json(successIntent);
    } catch (e) {
      next(e);
    }
  }

  async toCompleted(req, res, next) {
    try {
      const { id } = req.params;
      const notice = await NoticeOfIntent.findByPk(id);
      notice.status = 'completed';
      await notice.save();
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async toInProgress(req, res, next) {
    try {
      const { id } = req.params;
      const notice = await NoticeOfIntent.findByPk(id);
      notice.status = 'inProgress';
      await notice.save();
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async createCommissionedAdmin(req, res, next) {
    try {
      console.log(req.user);
      req.body.status = 'completed';
      req.body.UserId = req.user.id;
      await NoticeOfIntent.create(req.body);
      res.status(200).json({ saved: true });
    } catch (e) {
      next(e);
    }
  }

  async completedAndCommissionedBySubAdmin(req, res, next) {
    try {
      const { user } = req;
      console.log(user.applicationFormId);
      const noticeOfIntent = await ApplicationForm.findAll({
        attributes: ['firstName'],
        where: {
          id: user.applicationFormId,
        },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: NoticeOfIntent,
            where: {
              status: 'completed',
            },
            required: true,
          },
        },
      });

      const noticeOfIntents = [];
      const result = [];

      noticeOfIntent.forEach((notice) => {
        if (notice.User && notice.User.noticeOfIntents) {
          notice.User.noticeOfIntents.forEach((n) => {
            noticeOfIntents.push({
              ...n.dataValues,
              User: {
                applicationForm: {
                  firstName: notice.firstName,
                },
              },
            });
          });
          // noticeOfIntents.forEach((obj) => {
          //   console.log('NOTICE', obj);
          //   result.push({
          //     ...obj.dataValues,
          //     User: {
          //       applicationForm: {
          //         firstName: notice.firstName,
          //       },
          //     },
          //   });
          // });
        }
      });
      // console.log('HELLLOO', result[0]);

      const commissionedIntent = await ApplicationForm.findAll({
        attributes: ['firstName'],
        where: {
          id: user.applicationFormId,
        },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: NoticeOfIntent,
            where: {
              status: 'commissioned',
            },
            required: true,
          },
        },
      });

      const noticeOfIntentss = [];
      const results = [];

      commissionedIntent.forEach((notice) => {
        if (notice.User && notice.User.noticeOfIntents) {
          notice.User.noticeOfIntents.forEach((n) => {
            noticeOfIntentss.push({
              ...n.dataValues,
              User: {
                applicationForm: {
                  firstName: notice.firstName,
                },
              },
            });
          });
          // noticeOfIntentss.forEach((obj) => {
          //   console.log('NOTICE', obj);
          //   results.push({
          //     ...obj.dataValues,
          //     User: {
          //       applicationForm: {
          //         firstName: notice.firstName,
          //       },
          //     },
          //   });
          // });
        }
      });

      console.log(noticeOfIntentss);

      res.status(200).json({ completedIntent: noticeOfIntents, commissionedIntent: noticeOfIntentss });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async allProjectBySubAdmin(req, res, next) {
    try {
      const { user } = req;
      const noticeOfIntent = await ApplicationForm.findAll({
        attributes: ['firstName'],
        where: {
          id: user.applicationFormId,
        },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            where: {
              [Op.or]: [
                { status: 'inProgress' },
                { status: 'completed' },
                { status: 'commissioned' },
              ],
            },
            model: NoticeOfIntent,
            required: true,
          },
        },
      });

      const noticeOfIntents = [];
      const result = [];

      noticeOfIntent.forEach((notice) => {
        if (notice.User && notice.User.noticeOfIntents) {
          notice.User.noticeOfIntents.forEach((n) => {
            noticeOfIntents.push({
              ...n.dataValues,
              User: {
                applicationForm: {
                  firstName: notice.firstName,
                },
              },
            });
          });
          // noticeOfIntents.forEach((obj) => {
          //   console.log('NOTICE', obj);
          //   result.push({
          //     ...obj.dataValues,
          //     User: {
          //       applicationForm: {
          //         firstName: notice.firstName,
          //       },
          //     },
          //   });
          // });
        }
      });
      // console.log('HELLLOO', result[0]);

      // const commissionedIntent = await ApplicationForm.findAll({
      //   attributes: ['firstName'],
      //   where: {
      //     id: user.applicationFormId,
      //   },
      //   include: {
      //     model: User,
      //     attributes: ['id'],
      //     include: {
      //       model: NoticeOfIntent,
      //       where: {
      //         status: 'commissioned',
      //       },
      //       required: true,
      //     },
      //   },
      // });
      //
      // const noticeOfIntentss = [];
      // const results = [];
      //
      // commissionedIntent.forEach((notice) => {
      //   if (notice.User && notice.User.noticeOfIntents) {
      //     notice.User.noticeOfIntents.forEach((n) => {
      //       noticeOfIntentss.push(n);
      //     });
      //     noticeOfIntentss.forEach((obj) => {
      //       results.push({
      //         ...obj.dataValues,
      //         User: {
      //           applicationForm: {
      //             firstName: notice.firstName,
      //           },
      //         },
      //       });
      //     });
      //   }
      // });

      res.status(200).json({ completedIntent: noticeOfIntents });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async inProgressBySubAdmin(req, res, next) {
    try {
      const { user } = req;
      const noticeOfIntent = await ApplicationForm.findAll({
        attributes: ['firstName'],
        where: {
          id: user.applicationFormId,
        },
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: NoticeOfIntent,
            where: {
              status: 'inProgress',
            },
            required: true,
          },
        },
      });

      const noticeOfIntents = [];
      const result = [];

      noticeOfIntent.forEach((notice) => {
        if (notice.User && notice.User.noticeOfIntents) {
          notice.User.noticeOfIntents.forEach((n) => {
            noticeOfIntents.push({
              ...n.dataValues,
              User: {
                applicationForm: {
                  firstName: notice.firstName,
                },
              },
            });
          });
          // noticeOfIntents.forEach((obj) => {
          //   console.log('NOTICE', obj);
          //   result.push({
          //     ...obj.dataValues,
          //     User: {
          //       applicationForm: {
          //         firstName: notice.firstName,
          //       },
          //     },
          //   });
          // });
        }
      });
      // console.log('HELLLOO', result[0]);

      // const commissionedIntent = await ApplicationForm.findAll({
      //   attributes: ['firstName'],
      //   where: {
      //     id: user.applicationFormId,
      //   },
      //   include: {
      //     model: User,
      //     attributes: ['id'],
      //     include: {
      //       model: NoticeOfIntent,
      //       where: {
      //         status: 'commissioned',
      //       },
      //       required: true,
      //     },
      //   },
      // });
      //
      // const noticeOfIntentss = [];
      // const results = [];
      //
      // commissionedIntent.forEach((notice) => {
      //   if (notice.User && notice.User.noticeOfIntents) {
      //     notice.User.noticeOfIntents.forEach((n) => {
      //       noticeOfIntentss.push(n);
      //     });
      //     noticeOfIntentss.forEach((obj) => {
      //       results.push({
      //         ...obj.dataValues,
      //         User: {
      //           applicationForm: {
      //             firstName: notice.firstName,
      //           },
      //         },
      //       });
      //     });
      //   }
      // });

      res.status(200).json({ completedIntent: noticeOfIntents });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async completedAndCommissioned(req, res, next) {
    try {
      const completedIntent = await NoticeOfIntent.findAll({
        where: { status: 'completed' },
        attributes: ['id', 'businessName', 'status', 'planOnGoing', 'points'],
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      const commissionedIntent = await NoticeOfIntent.findAll({
        where: { status: 'commissioned' },
        attributes: ['id', 'businessName', 'status', 'planOnGoing', 'points', 'UserId', 'createdAt'],
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      res.status(200).json({ completedIntent, commissionedIntent });
    } catch (e) {
      next(e);
    }
  }

  async allProjectIntent(req, res, next) {
    try {
      const completedIntent = await NoticeOfIntent.findAll({
        where: {
          [Op.or]: [
            { status: 'inProgress' },
            { status: 'completed' },
            { status: 'commissioned' },
          ],
        },
        attributes: ['id', 'businessName', 'status', 'planOnGoing', 'points'],
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      res.status(200).json({ completedIntent });
    } catch (e) {
      next(e);
    }
  }

  async inProgressIntent(req, res, next) {
    try {
      const completedIntent = await NoticeOfIntent.findAll({
        where: { status: 'inProgress' },
        attributes: ['id', 'businessName', 'status', 'planOnGoing', 'points'],
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      res.status(200).json({ completedIntent });
    } catch (e) {
      next(e);
    }
  }

  async toCommissioned(req, res, next) {
    try {
      const { id } = req.params;
      const commissionedIntent = await NoticeOfIntent.findByPk(id);
      commissionedIntent.status = 'commissioned';
      await commissionedIntent.save();
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async paid(req, res, next) {
    try {
      const paidIntent = await NoticeOfIntent.findAll({
        where: { status: 'commissioned' },
        attributes: ['id', 'businessName', 'status'],
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      res.json({ paidIntent });
    } catch (e) {
      next(e);
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const project = await NoticeOfIntent.findByPk(id);
      await project.destroy();
      res.status(200).json({ status: 'updated Successfully' });
    } catch (e) {
      next(e);
    }
  }
}
export default AdminNoticeOfIntentController;
