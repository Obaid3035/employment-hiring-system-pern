import { GetInTouch } from '../../../../index';

class GetInTouchController {
  async getGetInTouches(req, res, next) {
    const getInTouch = await GetInTouch.findAll();
    res.status(200).json(getInTouch);
  }

  async deleteGetInTouches(req, res, next) {
    const getInTouch = await GetInTouch.findByPk(req.params.id);
    await getInTouch.destroy();
    res.status(200).json({ deleted: true });
  }
}

export default GetInTouchController;
