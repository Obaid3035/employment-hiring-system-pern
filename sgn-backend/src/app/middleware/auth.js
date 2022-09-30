import jwt from 'jsonwebtoken';
import { User, RoleDetail } from '../../../index';
import { UnAuthorized } from '../../lib/errorCode';
import { roles } from '../../lib/accessControl';

// const grantAccess = (action, resource) => async (req, res, next) => {
//   try {
//     const permission = roles.can(req.user.role)[action](resource);
//     if (!permission.granted) {
//       return res.status(401).json({
//         error: "You don't have enough permission to perform this action",
//       });
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new UnAuthorized('An Error Occurred');
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: { id: decode._id },
      include: [RoleDetail],
    });
    if (!user) {
      throw new UnAuthorized('Please Authorize Yourself');
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

// const adminGrantAccess = (action, resourse) => async (req, res, next) => {
//   try {
//     const { admin } = req;
//     const roleDeta = await admin.getRoleDetails();
//     const roleDetail = roleDeta.find((i) => i.moduleName === resourse);
//
//     if (!roleDetail) {
//       // Error
//     }
//     if (roleDetail[action] === false) {
//       res.send('Fuck You');
//     }
//     res.send(roleDetail);
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// const authAdmin = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     const admin = await Admin.findOne({ where: { id: decode._id } });
//
//     if (!admin) {
//       throw new UnAuthorized('Please Authorize Yourself');
//     }
//     // if (!user.confirmedAt) {
//     //   throw new UnAuthorized('Verify Your email');
//     // }
//     req.token = token;
//     req.admin = admin;
//     next();
//   } catch (e) {
//     next(e);
//   }
// };

export {
  auth,
};
