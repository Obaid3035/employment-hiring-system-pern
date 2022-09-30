import AccessControl from 'accesscontrol';

const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('candidate')
    .readOwn('applicationForm')
    .create('applicationForm');
  ac.grant('employee')
    .extend('candidate')
    .readAny('profile');

  ac.grant('admin')
    .extend('candidate')
    .extend('employee')
    .updateAny('profile')
    .deleteAny('profile');

  return ac;
}());
