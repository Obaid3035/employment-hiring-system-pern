import { Quote } from '../../../../index';

class AdminQuoteController {
  async index(req, res) {
    try {
      const quotes = await Quote.findAll();
      res.render('./admin/quote/index', {
        layout: './layouts/sideBar',
        quotes,
      });
    } catch (e) {
      console.log(e);
      req.flash('error', 'Something went wrong!');
      res.redirect('/admin');
    }
  }
}

export default AdminQuoteController;
