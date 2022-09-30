import { Query } from '../../../../index';

class AdminQueryController {
  async getQueries(req, res, next) {
    try {
      const query = await Query.findAll();
      res.status(200).json(query);
    } catch (e) {
      next(e);
    }
  }
}

export default AdminQueryController;
