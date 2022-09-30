import sequelize from 'sequelize';
import {
  ApplicationForm, JobListing, User, EducationHistory, EmploymentHistory, RoleDetail,
  Resume, Reference,
} from '../../../../index';
import sendHiredEmail from '../../../lib/hiredEmail';
import sendDeclineEmail from '../../../lib/declineEmail';
import generator from "generate-password";

class AdminApplicationFormController {
  async applicationForSubAdmin(req, res, next) {
    try {
      const { user } = req;
      console.log(user);
      const applicationForm = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
        where: {
          applicationStatus: 'underReview',
          id: user.applicationFormId,
        },
      });
      const hiredApplicant = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
        where: {
          applicationStatus: 'Hired',
          id: user.applicationFormId,
        },
      });
      const declinedApplicant = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
        where: {
          applicationStatus: 'Decline',
          id: user.applicationFormId,
        },
      });
      const allApplicant = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'applicationStatus', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
        where: {
          id: user.applicationFormId,
        },

      });
      res.status(200).send({
        applicationForm, declinedApplicant, hiredApplicant, allApplicant,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async index(req, res, next) {
    try {
      const applicationForm = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
        where: {
          applicationStatus: 'underReview',
        },
      });
      const hiredApplicant = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
        where: {
          applicationStatus: 'Hired',
        },
      });
      const declinedApplicant = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
        where: {
          applicationStatus: 'Decline',
        },
      });
      const allApplicant = await ApplicationForm.findAll({
        attributes: ['id', 'firstName', 'lastName', 'applicationStatus', 'createdAt'],
        include: [
          {
            model: JobListing,
            attributes: ['jobTitle', 'jobCountry', 'jobState', 'jobCity'],
            required: true,
          },
        ],
      });
      res.status(200).send({
        applicationForm, declinedApplicant, hiredApplicant, allApplicant,
      });
    } catch (e) {
      next(e);
    }
  }

  async show(req, res, next) {
    try {
      const applicationID = req.params.id;
      const application = await ApplicationForm.findOne({
        where: {
          id: applicationID,
        },
        include: [
          {
            model: EmploymentHistory,
          },
          {
            model: EducationHistory,
          },
          {
            model: Reference,
          },
          {
            model: User,
            attributes: ['email'],
            required: true,
            include: {
              model: Resume,
              required: false,
            },
          },
        ],
      });
      res.json(application);
    } catch (e) {
      next(e);
    }
  }

  async decline(req, res, next) {
    try {
      const applicationID = req.params.id;
      const application = await ApplicationForm.findOne({
        where: { id: applicationID },
        include: {
          model: User,
          attributes: ['id', 'email'],
        },
      });
      application.applicationStatus = 'Decline';
      await application.save();
      await sendDeclineEmail(application.User.email, application.firstName);
      const user = await User.findOne({
        where: {email: application.User.email},
      })
      const random = generator.generate({
        length: 7,
        numbers: true,
      });
      user.email = `${random}@ipsum.com`;
      await user.save()
      res.json('Status Successfully Changed');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async active(req, res, next) {
    try {
      const applicationID = req.params.id;
      const application = await ApplicationForm.findOne({
        where: { id: applicationID },
        include: [User],
      });
      application.applicationStatus = 'Active';
      await application.User.update({ roles: ['employee'] });
      const roleDetail = await RoleDetail.findOne({
        where: { UserId: application.User.id },
      });
      if (!roleDetail) {
        await RoleDetail.create({
          UserId: application.User.id,
          project: false,
          subAdmin: false,
          employee: false,
          job: false,
          application: false,
          quote: false,
          benefit: false,
          payment: false,
          toDoList: false,
          noticeOfIntent: false,
        });
      }
      await application.save();
      res.json('Status Successfully Changed');
    } catch (e) {
      next(e);
    }
  }

  async hired(req, res, next) {
    try {
      const applicationID = req.params.id;

      const application = await ApplicationForm.findOne({
        where: { id: applicationID },
        include: {
          model: User,
          attributes: ['id', 'email'],
        },
      });
      application.applicationStatus = 'Hired';
      application.referralID = req.body.referralID;
      await application.save();

      if (req.body.subAdmins) {
        const user = await User.findByPk(req.body.subAdmins.value);
        await user.update({ applicationFormId: sequelize.fn('array_append', sequelize.col('applicationFormId'), applicationID) });
      }
      await sendHiredEmail(application.User.email, application.firstName);
      res.send(200).json('Status Successfully Changed');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default AdminApplicationFormController;
