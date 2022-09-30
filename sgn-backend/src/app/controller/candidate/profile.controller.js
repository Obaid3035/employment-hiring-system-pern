import { ApplicationForm, Contract } from '../../../../index';

class ProfileController {
  async getProfile(req, res, next) {
    try {
      const { user } = req;
      const profile = await ApplicationForm.findOne({
        where: { UserId: user.id },
        attributes: ['firstName', 'middleName', 'lastName', 'streetAddress', 'zipCode', 'phoneNumber'],
      });
      res.status(200).json({ profile, email: user.email });
    } catch (e) {
      next(e);
    }
  }

  async getRole(req, res, next) {
    try {
      const { user } = req;
      const appFormID = await ApplicationForm.findOne({
        where: { UserId: user.id },
        attributes: ['id', 'UserId'],
      });
      res.status(200).json({ role: user.roles, id: appFormID.id });
      res.status(200).json('Contract Updated Successfully');
    } catch (e) {
      next(e);
    }
  }
}

export default ProfileController;
