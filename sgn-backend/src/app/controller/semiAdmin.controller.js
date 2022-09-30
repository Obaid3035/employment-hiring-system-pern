import { User } from '../../../index';
import { UnAuthorized } from '../../lib/errorCode';

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();

      console.log(user.status);

      if (user.roles.includes('semiAdmin') && user.status === 'Enabled') {
        res.status(200).json({ token, role: user.roles });
      } else {
        throw new UnAuthorized('Access Denied');
      }
    } catch (e) {
      next(e);
    }
  },
};
