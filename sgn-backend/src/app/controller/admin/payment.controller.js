import { Op } from 'sequelize';
import stream from 'stream';
import {
  Payment, User, ApplicationForm, Contract,
} from '../../../../index';
// https://sleepy-savannah-00668.herokuapp.com/
class AdminPaymentController {
  async uploadReceipt(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.body);
      const file = await Payment.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.buffer,
        description: req.body.description,
        UserId: id,
      });

      const result = {
        status: 'ok',
        filename: req.file.originalname,
        message: 'Upload Successfully!',
        downloadUri: `http://localhost:4000/upload/${file.dataValues.id}`,
      };
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async allPayment(req, res, next) {
    try {
      const { user } = req;

      const payment = await Payment.findAll({
        attributes: ['id', 'name', 'createdAt'],
        where: { UserId: user.id },
      });
      res.status(200).json(payment);
    } catch (e) {
      next(e);
    }
  }

  async paidAccount(req, res, next) {
    try {
      const user = await User.findAll({
        attributes: ['id'],
        where: { roles: { [Op.contains]: ['employee'] } },
        include: [
          {
            model: Payment,
            required: true,
            attributes: ['description'],
          },
          {
            model: ApplicationForm,
            attributes: ['firstName'],
            required: true,
          },
        ],
      });
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async getPayment(req, res, next) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);
      const fileContents = Buffer.from(payment.data, 'base64');
      const readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set('Content-disposition', `attachment; filename=${payment.name}`);
      res.set('Content-Type', payment.type);

      readStream.pipe(res);
    } catch (e) {
      next(e);
    }
  }
}

export default AdminPaymentController;
