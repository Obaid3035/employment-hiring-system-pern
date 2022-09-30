import nodemailer from 'nodemailer';
import mailgun from 'mailgun-js';
import stream from 'stream';
import { File, Quote, GetInTouch } from '../../../index';
import sendVerificationEmail from '../../lib/sendGrid';
import sendQuestionareEmail from '../../lib/sentQuestionareEmail';

// const mailGun = require('nodemailer-mailgun-transport');
// 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
// hUgsud-rosmun-jijqa5
class QueryController {
  async createQuery(req, res, next) {
    try {
      const getInTouch = await GetInTouch.create({ name: req.body.name, email: req.body.email, description: req.body.description });
      res.status(201).json(getInTouch);
      // await Query.create(req.body);
      // const { name, email, message } = req.body;
      // const auth = {
      //   auth: {
      //     api_key: 'c860249c764c9a2109450fa23b011dd0-1d8af1f4-98a80d13',
      //     domain: 'sandboxeae4dde9a3d4463dbedcb9d2f53b7655.mailgun.org',
      //   },
      // };
      //
      // const transporter = nodemailer.createTransport(mailGun(auth));
      // const mailOptions = {
      //   sender: name,
      //   from: email,
      //   to: 'HR@sitchaglobalnetwork.com',
      //   subject: 'Queries',
      //   text: message,
      // };
      //
      // transporter.sendMail(mailOptions, (err, data) => {
      //   if (err) {
      //     res.status(200).json({ send: false });
      //   } else {
      //     res.status(200).json({ saved: true });
      //   }
      // });
    } catch (e) {
      next(e);
    }
  }

  async createQuotes(req, res, next) {
    try {
      const quote = await Quote.create(req.body);
      await sendQuestionareEmail(req.body.email, req.body.firstName);
      res.status(200).json(quote);
    } catch (e) {
      next(e);
    }
  }

  async updateQuote(req, res, next) {
    try {
      const { id } = req.params;
      const quote = await Quote.findByPk(id);
      quote.representative = req.body.representative;
      quote.lastInteractive = req.body.lastInteractive;
      quote.recommend = req.body.recommend;
      quote.code = req.body.code;
      await quote.save();
      res.status(200).json(quote);
    } catch (e) {
      next(e);
    }
  }

  async getQuotes(req, res, next) {
    try {
      const quotes = await Quote.findAll();
      res.status(200).json(quotes);
    } catch (e) {
      console.log(e);
    }
  }

  async getSingleQuote(req, res, next) {
    try {
      const quotes = await Quote.findOne({
        where: { id: req.params.id },
        include: File,
      });
      res.status(200).json(quotes);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteQuote(req, res, next) {
    try {
      const quotes = await Quote.findByPk(req.params.id);
      await quotes.destroy();
      res.status(200).json({ deleted: true });
    } catch (e) {
      console.log(e);
    }
  }

  async quoteUpload(req, res, next) {
    try {
      const { id } = req.params;
      const file = await File.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.buffer,
        quoteId: id,
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

  async getFile(req, res, next) {
    try {
      const { id } = req.params;
      const resume = await File.findByPk(id);
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
}

export default QueryController;
