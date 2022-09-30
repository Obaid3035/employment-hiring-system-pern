import {
  ApplicationForm, User, Benefit, UserBenefit,
} from '../../../../index';

class AdminBenefitController {
  async benefitsBySubAdmin(req, res, next) {
    try {
      const benefits = await Benefit.findAll();
      res.status(200).json(benefits);
    } catch (e) {
      next(e);
    }
  }

  async index(req, res, next) {
    try {
      const benefits = await Benefit.findAll();
      console.log(benefits);
      res.status(200).json(benefits);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deleteBenefit(req, res, next) {
    try {
      const benefitId = req.params.id;
      const benefit = await Benefit.findByPk(benefitId);
      await benefit.destroy();
      res.status(200).json({ delete: true });
    } catch (e) {
      next(e);
    }
  }

  async allUserBenefits(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: Benefit,
      });
      const benefits = await Benefit.findAll({
        include: {
          model: User,
          attributes: ['id'],
          include: {
            model: ApplicationForm,
            attributes: ['firstName'],
          },
        },
      });
      res.status(200).json({ benefits, user });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { title, description } = req.body;
      await Benefit.create({
        title,
        description,
      });
      res.json({ saved: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async addBenefit(req, res, next) {
    try {
      const UserId = req.params.id;
      const user = await User.findByPk(UserId);
      for (const key of req.body) {
        const benefit = await Benefit.findByPk(key.id);
        if (key.assigned) {
          await user.addBenefit(benefit);
        } else {
          await user.removeBenefit(benefit);
        }
      }
      res.json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  async assigned(req, res, next) {
    try {
      const { user } = req;
      const benefits = await UserBenefit.findAll({
        where: { UserId: user.id },
        include: Benefit,
      });
      res.status(200).json(benefits);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
export default AdminBenefitController;
