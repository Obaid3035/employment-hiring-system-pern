import { Op } from 'sequelize';
import {
  User, ApplicationForm, JobListing, Contract, Benefit, NoticeOfIntent,
} from '../../../../index';

class AdminEmployeeController {
  async employeesForSubAdmin(req, res, next) {
    try {
      const { user } = req;

      const usersActive = await User.findAll({
        where: { roles: { [Op.contains]: ['employee'] } },
        include: [{
          model: ApplicationForm,
          where: {
            applicationStatus: 'Active',
            id: user.applicationFormId,
          },
          required: true,
          order: [
            ['referralID', 'ASC'],
          ],
          include: JobListing,
        }],
      });
      const usersInActive = await User.findAll({
        where: { roles: { [Op.contains]: ['employee'] } },
        include: [{
          model: ApplicationForm,
          where: {
            applicationStatus: 'inActive',
            id: user.applicationFormId,
          },
          required: true,
          include: JobListing,
        }],
      });
      res.status(200).json({ usersActive, usersInActive });
    } catch (e) {
      next(e);
    }
  }

  async index(req, res, next) {
    try {
      const usersActive = await User.findAll({
        where: { roles: { [Op.contains]: ['employee'] } },
        include: [{
          model: ApplicationForm,
          where: { applicationStatus: 'Active' },
          order: [
            ['referralID', 'ASC'],
          ],
          include: JobListing,
        }],
      });
      const usersInActive = await User.findAll({
        where: { roles: { [Op.contains]: ['employee'] } },
        include: [{
          model: ApplicationForm,
          where: { applicationStatus: 'inActive' },
          include: JobListing,
        }],
      });
      res.status(200).json({ usersActive, usersInActive });
    } catch (e) {
      next(e);
    }
  }

  async show(req, res, next) {
    try {
      const employeeID = req.params.id;
      const employee = await User.findOne({
        where: { id: employeeID },
        attributes: ['id', 'email', 'roles'],
        include: [
          {
            model: ApplicationForm,
            attributes: ['id', 'firstName', 'phoneNumber', 'notes'],
            include: {
              model: JobListing,
              attributes: ['jobTitle'],
            },
          },
          {
            model: Contract,
            attributes: ['id', 'createdAt', 'name', 'status'],
            required: false,
          },

          {
            model: Benefit,
            attributes: ['id', 'title', 'description'],
            required: false,
          },
          {
            model: NoticeOfIntent,
            attributes: ['id'],
            where: { status: 'successful' },
            required: false,
          },
        ],
      });
      res.status(200).json({ employee, id: employee.applicationForm.id });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async inActive(req, res, next) {
    try {
      const employeeID = req.params.id;
      const user = await ApplicationForm.findOne({
        where: { UserId: employeeID },
      });
      user.applicationStatus = 'inActive';
      await user.save();
      res.json('Status Changed Successfully');
    } catch (e) {
      next(e);
    }
  }

  async addNotes(req, res, next) {
    try {
      const { notes } = req.body;
      const user = await User.findOne({
        where: { id: req.params.id },
        attributes: ['id'],
        include: {
          model: ApplicationForm,
          attributes: ['id'],
        },
      });
      const appForm = await ApplicationForm.findOne({
        where: { id: user.applicationForm.id },
      });
      await appForm.update({ notes });
      res.status(200).json('Successfully Updated');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async updatePosition(req, res, next) {
    try {
      const { jobTitle } = req.body;
      const user = await User.findOne({
        where: { id: req.params.id },
        attributes: ['id'],
        include: {
          model: ApplicationForm,
          attributes: ['id'],
          include: {
            model: JobListing,
            attributes: ['id'],
          },
        },
      });
      const job = await JobListing.findOne({
        where: { id: user.applicationForm.jobListing.id },
      });
      await job.update({ jobTitle });
      res.status(200).json('Successfully Updated');
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default AdminEmployeeController;
