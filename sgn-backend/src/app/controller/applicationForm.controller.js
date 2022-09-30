import { hash } from 'bcrypt';
import generator from 'generate-password';
import stream from 'stream';
import sequelize, { Op, where } from 'sequelize';
import {
  User, ApplicationForm, JobListing, Notification, Payment, Resume, Contract,
} from '../../../index';
import { CANDIDATE, EMPLOYEE } from '../../lib/roles';
import sendVerificationEmail from '../../lib/sendGrid';
import sendApplicantEmail from '../../lib/applicationEmail';
import { UnAuthorized } from '../../lib/errorCode';

class ApplicationFormController {
  async index(req, res, next) {
    try {
      const { user } = req;

      const applicationForms = await ApplicationForm.findAll(
        {
          where: { UserId: user.id },
          attributes: ['jobListingId', 'applicationStatus', 'createdAt'],
          include: {
            model: JobListing,
            attributes: ['jobDescription', 'jobCountry', 'jobState', 'jobCity', 'jobTitle'],
            required: true,
          },
        },
      );
      res.status(200).json(applicationForms);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const password = generator.generate({
        length: 7,
        numbers: true,
      });
      const {
        email, employmentHistory, educationHistory, referenceHistory, applicationForm, subAdmins,
      } = req.body;
      console.log(subAdmins);

      await User.userExist(email);
      const user = await User.create({ email, password, roles: [CANDIDATE] });
      applicationForm.UserId = user.id;
      const application = await ApplicationForm.create(applicationForm);

      console.log(application);
      await sendVerificationEmail(user.email, user.password, applicationForm.firstName);
      console.log(user.password);
      user.password = await hash(user.password, 8);
      await user.save();
      if (educationHistory) {
        for (const i of educationHistory) {
          await application.createEducationHistory(i);
        }
      }
      if (employmentHistory) {
        for (const i of employmentHistory) {
          await application.createEmploymentHistory(i);
        }
      }

      if (referenceHistory) {
        for (const i of referenceHistory) {
          await application.createReference(i);
        }
      }

      if (subAdmins) {
        const subAdmin = await User.findByPk(subAdmins.value);
        console.log(subAdmin);
        console.log('IDDD', subAdmins.value);
        if (subAdmin) {
          await subAdmin.update({ applicationFormId: sequelize.fn('array_append', sequelize.col('applicationFormId'), application.id.toString()) });
        }
      }

      await Notification.create({ description: `${user.email} has created Application`, UserId: user.id });
      await sendApplicantEmail(user.email, application.firstName);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      const applicationForm = await ApplicationForm.findOne({
        where: { UserId: user.id },
      });
      // if (applicationForm.applicationStatus === 'underReview') {
      //
      // }
      //
      // if (applicationForm.applicationStatus === 'Hired') {
      //
      // }
      //
      // if (applicationForm.applicationStatus === 'Active') {
      //
      // }

      if (user.status === 'Enabled') {
        if (applicationForm) {
          res.status(200).json({
            token, status: applicationForm.applicationStatus, role: user.roles, currentUser: user.id,
          });
        } else {
          res.status(200).json({
            token, status: 'SubAdmin', role: user.roles, currentUser: user.id,
          });
        }
      } else {
        throw new UnAuthorized('Email or Password is incorrect');
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  // aRWu27f

  // TxnHcem
  async logout(req, res, next) {
    try {
      req.session.destroy();
      if (req.user) {
        req.user = null;
      }
      res.redirect('/');
    } catch (e) {
      req.flash('error', 'Something went wrong!');
      res.redirect('/');
    }
  }

  async resumeUpload(req, res, next) {
    try {
      const { id } = req.params;
      const file = await Resume.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.buffer,
        UserId: id,
      });

      const result = {
        status: 'ok',
        filename: req.file.originalname,
        message: 'Upload Successfully!',
        downloadUri: `http://localhost:4000/resume/${file.dataValues.id}`,
      };
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getResume(req, res, next) {
    try {
      const { id } = req.params;
      const resume = await Resume.findByPk(id);
      const fileContents = Buffer.from(resume.data, 'base64');
      const readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set('Content-disposition', `attachment; filename=${resume.name}`);
      res.set('Content-Type', resume.type);

      readStream.pipe(res);
    } catch (e) {
      next(e);
    }
  }

  async getApplication(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const subadmin = await User.findOne({
        where: {
          applicationFormId: { [Op.contains]: [id] },
        },
      });
      console.log(subadmin);
      if (subadmin) {
        res.status(200).json({ required: 'false' });
      } else {
        res.status(200).json({ required: 'true' });
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default ApplicationFormController;
