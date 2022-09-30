import jwt from 'jsonwebtoken';
import { User, RoleDetail } from '../../../index';
import { UnAuthorized } from '../../lib/errorCode';

// const adminGrantAccess = (action, resourse) => async (req, res, next) => {
//   try {
//     const { admin } = req;
//     const roleDeta = await admin.getRoleDetails();
//     const roleDetail = roleDeta.find((i) => i.moduleName === resourse);
//
//     if (!roleDetail) {
//       throw new UnAuthorized('Please Authorize Yourself');
//     }
//     if (roleDetail[action] === false) {
//       throw new UnAuthorized('Please Authorize Yourself');
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.session;
    if (!token) {
      throw new UnAuthorized('An Error Occurred');
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findOne({ where: { id: decode._id } });

    if (!admin) {
      throw new UnAuthorized('Please Authorize Yourself');
    }

    req.admin = admin;
    next();
  } catch (e) {
    req.flash('error', 'Please Authorize Yourself');
    res.render('/admin');
  }
};

const adminGrantAccess = () => async (req, res, next) => {
  // const adminId = req.admin;
  // const admin = await User.findOne({
  //   where: { id: 1 },
  //   include: [RoleDetail],
  // });
  // if (admin.roleDetail[resource]) {
  //   next();
  // } else {
  //   req.flash('error', 'Please Authorize Yourself');
  //   res.render('/admin');
  // }
  const user = await User.findOne({
    where: { id: 1 },
    include: [RoleDetail],
  });
  if (user) {
    res.locals.userss = user;
    next();
  } else {
    req.flash('error', 'Please Authorize Yourself');
    res.render('/admin');
  }
};
export {
  authAdmin,
  adminGrantAccess,
};
