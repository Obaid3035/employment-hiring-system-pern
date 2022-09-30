import stream from 'stream';
import { Contract, ApplicationForm, User } from '../../../../index';

class ContractController {
  async index(req, res, next) {
    try {
      const { user } = req;
      const contract = await Contract.findAll({
        attributes: ['id', 'name', 'UserId', 'createdAt'],
        where: { UserId: user.id },
      });
      res.status(200).json(contract);
    } catch (e) {
      next(e);
    }
  }

  async uploadContract(req, res, next) {
    try {
      const { id } = req.params;
      const applicationForm = await ApplicationForm.findOne({
        where: { id },
        attributes: ['id', 'UserId', 'createdAt'],
      });

      const file = await Contract.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.buffer,
        UserId: applicationForm.UserId,
        status: req.body.status,
      });
      const result = {
        status: 'ok',
        filename: req.file.originalname,
        message: 'Upload Successfully!',
        downloadUri: `http://localhost:4000/upload/${file.dataValues.id}`,
      };
      // https://sleepy-savannah-00668.herokuapp.com
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async downloadFile(req, res, next) {
    try {
      const { id } = req.params;
      const contract = await Contract.findByPk(id);
      const fileContents = Buffer.from(contract.data, 'base64');
      const readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set('Content-disposition', `attachment; filename=${contract.name}`);
      res.set('Content-Type', contract.type);

      readStream.pipe(res);
    } catch (e) {
      next(e);
    }
  }

  // async signedContract(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const contract = await Contract.findByPk(id);
  //     contract.status = 'signed';
  //     await contract.save();
  //     res.status(200).json('Contract Updated Successfully');
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async allContract(req, res, next) {
    try {
      const { id } = req.params;
      const applicationForm = await ApplicationForm.findOne({
        where: { id },
        attributes: ['firstName'],
      });
      const contract = await Contract.findAll({
        attributes: ['id', 'name', 'status', 'createdAt'],
      });
      res.status(200).json({ contract, applicationForm });
    } catch (e) {
      next(e);
    }
  }
}

export default ContractController;
