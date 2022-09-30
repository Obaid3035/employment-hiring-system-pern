import bcrypt, { hash } from 'bcrypt';
import generator from 'generate-password';
import jwt from 'jsonwebtoken';
import { User, RoleDetail } from '../../../../index';
import { UnAuthorized } from '../../../lib/errorCode';
import sendForgotPasswordMail from '../../../lib/forgetPassword';
import sendVerificationEmail from '../../../lib/sendGrid';

class AdminController {
  async create(req, res, next) {
    try {
      const password = generator.generate({
        length: 7,
        numbers: true,
      });
      const user = await User.create({ email: 'obaid3035@gmail.com', password, roles: ['admin'] });
      await sendVerificationEmail(user.email, user.password, 'Admin');
      user.password = await hash(user.password, 8);
      await user.save();
      const roleDetail = await RoleDetail.create({
        UserId: user.id,
        project: true,
        subAdmin: true,
        employee: true,
        job: true,
        application: true,
        quote: true,
        benefit: true,
        payment: true,
        toDoList: true,
        noticeOfIntent: true,
      });
      res.send(roleDetail);
    } catch (e) {
      next(e);
    }
  }

  async getRoleDetail(req, res, next) {
    try {
      const { user } = req;
      console.log(user);
      // const roleDetail = await RoleDetail.findOne({
      //   where: { UserId: id },
      //   include: {
      //     model: User,
      //     attributes: ['roles'],
      //   },
      // });
      res.send(user);
    } catch (e) {
      next(e);
    }
  }

  // bdHm5jh
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();

      if (user.roles.includes('admin')) {
        res.status(200).json({ token, role: user.roles });
      } else {
        throw new UnAuthorized('Access Denied');
      }
    } catch (e) {
      next(e);
    }
  }

  async forgetPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        await sendForgotPasswordMail(user);
        res.status(200).json({ email: 'sent' });
      } else {
        res.status(200).json({ error: 'User Not Found' });
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async authenticate(req, res, next) {
    try {
      const token = req.params.id;
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log('DECODE', decode);
      const user = await User.findByPk(decode._id);
      if (!user) {
        res.status(200).send({ authenticate: false });
      } else {
        res.status(200).json({ authenticate: true });
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const token = req.params.id;
      const { password } = req.body;
      const new_password = await bcrypt.hash(password, 10);
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decode._id);
      user.password = new_password;
      await user.save();

      res.status(200).json({ updated: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default AdminController;
