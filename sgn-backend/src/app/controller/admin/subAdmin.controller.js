import sequelize, { Op } from 'sequelize';
import { hash } from 'bcrypt';
import { User, RoleDetail, ApplicationForm } from '../../../../index';

class AdminSubAdminController {
  async index(req, res, next) {
    try {
      const subAdmin = await User.findAll({
        where: {
          roles: {
            [Op.contains]: ['subAdmin'],
          },
          status: 'Enabled',
        },
      });

      const disabledSubAdmin = await User.findAll({
        where: {
          roles: {
            [Op.contains]: ['subAdmin'],
          },
          status: 'Disabled',
        },
      });

      res.status(200).json({ subAdmin, disabledSubAdmin });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const {
        uniqueID, email, password, firstName, lastName, phoneNumber,
      } = req.body;
      const user = await User.create({
        email, password, firstName, lastName, phoneNumber, uniqueID, roles: ['subAdmin'],
      });
      user.password = await hash(user.password, 8);
      await user.save();
      await RoleDetail.create({
        UserId: user.id,
        project: true,
        subAdmin: false,
        employee: true,
        job: false,
        application: true,
        quote: true,
        benefit: true,
        payment: true,
        toDoList: true,
        noticeOfIntent: true,
        chat: true,
      });
      res.send(user);
    } catch (e) {
      next(e);
    }
  }

  async ability(req, res, next) {
    try {
      const { id } = req.params;
      let roleDetail = await RoleDetail.findOne({
        attributes: ['subAdmin', 'employee', 'project', 'job', 'application', 'quote'],
        where: { UserId: id },
      });
      if (!roleDetail) {
        roleDetail = await RoleDetail.create({ UserId: id });
        delete roleDetail.id;
        delete roleDetail.UserId;
        delete roleDetail.createdAt;
        delete roleDetail.updatedAt;
      }

      res.status(200).json(roleDetail);
    } catch (e) {
      next(e);
    }
  }

  async createAbility(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      body.UserId = id;
      const user = await User.findOne({
        where: { id },
      });
      user.roles = ['employee', 'subAdmin'];
      await user.save();
      const roleDetail = await RoleDetail.findOne({
        where: { UserId: id },
      });
      if (roleDetail) {
        await roleDetail.update(req.body);
      } else {
        await RoleDetail.create(body);
      }
      res.status(201).json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findByPk(id);
      await admin.destroy();
      req.flash('success', 'SubAdmin deleted successfully!');
      res.redirect('/subAdmin');
    } catch (e) {
      req.flash('error', 'Something went wrong!');
      res.redirect('/admin');
    }
  }

  async showAdmins(req, res, next) {
    try {
      const subAdmins = await User.findAll({
        where: {
          [Op.and]: [
            {
              roles: { [Op.contains]: ['subAdmin'] },
            },
            {
              [Op.not]: {
                roles: { [Op.contains]: ['employee'] },
              },
            },
          ],
          status: 'Enabled',
        },
      });
      const updatedUser = subAdmins.map((i) => ({
        label: i.uniqueID,
        value: i.id,
      }));

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  async viewSubAdmin(req, res, next) {
    try {
      const subAdminId = req.params.id;
      let applications = [];
      const user = await User.findByPk(subAdminId);
      if (user.applicationFormId) {
        applications = await ApplicationForm.findAll({
          where: {
            id: user.applicationFormId,
            [Op.or]: [
              {
                applicationStatus: 'Hired',
              },
              {
                applicationStatus: 'Active',
              },
              {
                applicationStatus: 'Decline',
              },
            ],
          },
          include: {
            model: User,
          },
        });
      }
      res.status(200).json({ user, applications });
    } catch (e) {
      next(e);
    }
  }

  async removeSubAdmin(req, res, next) {
    try {
      const applicationId = req.params.id;
      const { subAdminId } = req.body;
      const subAdmin = await User.findByPk(subAdminId);
      const applicationIDs = subAdmin.applicationFormId.slice();
      subAdmin.applicationFormId.forEach((id, index) => {
        if (id.toString() === applicationId.toString()) {
          applicationIDs.splice(index, 1);
        }
      });
      subAdmin.applicationFormId = applicationIDs;
      await subAdmin.save();
      res.status(200).json(subAdmin);
    } catch (e) {
      next(e);
    }
  }

  async showApp(req, res, next) {
    try {
      const applications = await ApplicationForm.findAll({
        where: {
          [Op.or]: [
            {
              applicationStatus: 'Hired',
            },
            {
              applicationStatus: 'Active',
            },

          ],
        },
      });
      const subAdmins = await User.findAll({
        where: {
          [Op.and]: [
            {
              roles: { [Op.contains]: ['subAdmin'] },
            },
            {
              [Op.not]: {
                roles: { [Op.contains]: ['employee'] },
              },
            },
          ],
        },
      });

      Array.prototype.unique = function () {
        const a = this.concat();
        for (let i = 0; i < a.length; ++i) {
          for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
          }
        }

        return a;
      };

      const mergeSubAdminAppID = [];

      subAdmins.forEach((subAdmin) => {
        mergeSubAdminAppID.push([].concat(subAdmin.applicationFormId));
      });

      const resultantAppFormIds = [].concat.apply([], mergeSubAdminAppID).unique();

      console.log('MY SUB APPS IDS', resultantAppFormIds);

      const appFormID = [];
      applications.forEach((j) => {
        appFormID.push(j.id);
      });

      console.log('MY APP IDS', appFormID);

      const result = [];

      appFormID.forEach((m) => {
        if (resultantAppFormIds.indexOf(m.toString()) === -1) {
          result.push(m);
        }
      });

      const application = await ApplicationForm.findAll({
        where: {
          id: result,
        },
      });

      console.log(application);

      const newArr = application.map((i) => ({
        label: i.referralID,
        value: i.id,
      }));

      res.status(200).json(newArr);
    } catch (e) {
      next(e);
    }
  }

  async addAppToSubAdmin(req, res, next) {
    try {
      const applicationId = req.params.id;
      const { subAdminId } = req.body;
      const user = await User.findByPk(subAdminId);
      await user.update({ applicationFormId: sequelize.fn('array_append', sequelize.col('applicationFormId'), applicationId) });
      res.status(200).json({ saved: true });
    } catch (e) {
      next(e);
    }
  }

  async onSubAdminDisabled(req, res, next) {
    try {
      const subAdminId = req.params.id;
      const user = await User.findByPk(subAdminId);
      user.applicationFormId = [];
      user.status = 'Disabled';
      await user.save();
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async onSubAdminEnable(req, res, next) {
    try {
      const subAdminId = req.params.id;
      const user = await User.findByPk(subAdminId);
      user.status = 'Enabled';
      await user.save();
      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }
}

export default AdminSubAdminController;
