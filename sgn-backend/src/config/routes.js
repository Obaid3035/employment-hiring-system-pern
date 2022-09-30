import express from 'express';
import ApplicationFormController from '../app/controller/applicationForm.controller';
import JobListingController from '../app/controller/jobListing.controller';
import AdminApplicationFormController from '../app/controller/admin/applicationForm.controller';
import AdminJobListingController from '../app/controller/admin/jobListing.controller';
import AdminNoticeOfIntentController from '../app/controller/admin/noticeOfIntent.controller';
import AdminEmployeeController from '../app/controller/admin/employee.controller';
import GetInTouchController from '../app/controller/admin/gerInTouch.controller';
import AdminSubAdminController from '../app/controller/admin/subAdmin.controller';
import AdminController from '../app/controller/admin/admin.controller';
import AdminBenefitController from '../app/controller/admin/benefit.controller';
import EmployeeNoticeOfIntentController from '../app/controller/employee/noticeOfIntent.controller';
import AdminRewardController from '../app/controller/admin/reward.controller';
import EmployeeRewardController from '../app/controller/employee/reward.controller';
import ProfileController from '../app/controller/candidate/profile.controller';
import ContractController from '../app/controller/employee/contract.controller';
import AdminNotificationController from '../app/controller/admin/notification.controller';
import AdminPaymentController from '../app/controller/admin/payment.controller';
import AdminReportController from '../app/controller/admin/report.controller';
import AdminMessageController from '../app/controller/admin/message.controller';
import QueryController from '../app/controller/query.controller';
import AdminQueryController from '../app/controller/admin/query.controller';
import SemiAdminController from '../app/controller/semiAdmin.controller';
import { auth } from '../app/middleware/auth';

const upload = require('../lib/multer.js');

const userController = new ApplicationFormController();
const jobController = new JobListingController();
const adminApplicationController = new AdminApplicationFormController();
const adminJobListing = new AdminJobListingController();
const adminNoticeOfIntent = new AdminNoticeOfIntentController();
const adminEmployee = new AdminEmployeeController();
const adminSubAdmin = new AdminSubAdminController();
const adminController = new AdminController();
const adminBenefit = new AdminBenefitController();
const employeeNoticeOfIntent = new EmployeeNoticeOfIntentController();
const employeeReward = new EmployeeRewardController();
const adminReward = new AdminRewardController();
const profile = new ProfileController();
const contract = new ContractController();
const adminNotification = new AdminNotificationController();
const adminPayment = new AdminPaymentController();
const adminReport = new AdminReportController();
const adminMessage = new AdminMessageController();
const query = new QueryController();
const adminQuery = new AdminQueryController();
const getInTouch = new GetInTouchController();
const router = express.Router();

// dRRr64E
// query
router.post('/query', query.createQuery);
router.post('/quote', query.createQuotes);
router.get('/quote', query.getQuotes);
router.put('/quote/:id', query.updateQuote);
router.get('/quote/:id', query.getSingleQuote);
router.delete('/quote/:id', query.deleteQuote);
router.post('/file/:id', upload.single('file'), query.quoteUpload);
router.get('/file/:id', query.getFile);

router.post('/semiAdmin/login', SemiAdminController.login);
// Get In Touch

router.get('/admin/getInTouch', getInTouch.getGetInTouches);
router.delete('/admin/getInTouch/:id', getInTouch.deleteGetInTouches);

// admin/query
router.get('/admin/query', adminQuery.getQueries);

// jobs
router.get('/jobs', jobController.index);
router.get('/job/:id', jobController.show);

// // Registration //Application Form
router.get('/application', auth, userController.index);
router.get('/get-app/:id', userController.getApplication);
router.post('/register', userController.create);
router.post('/resume/:id', upload.single('resume'), userController.resumeUpload);
router.get('/resume/:id', userController.getResume);

router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.post('/admin/login', adminController.login);
router.post('/admin/forgotPassword', adminController.forgetPassword);
router.get('/authenticate/:id', adminController.authenticate);
router.put('/reset-password/:id', adminController.resetPassword);

router.post('/admin/create', adminController.create);
router.get('/admin/role', auth, adminController.getRoleDetail);

// admin/job
router.get('/admin/job', adminJobListing.index);
router.get('/admin/job/:id', adminJobListing.show);
router.post('/admin/job', adminJobListing.create);
router.put('/admin/job/:id', adminJobListing.update);
router.delete('/admin/job/:id', adminJobListing.destroy);

//
// admin/subAdmin

router.get('/subAdmins', adminSubAdmin.index);
router.post('/subAdmin', adminSubAdmin.create);
router.get('/subAdmin/:id', adminSubAdmin.ability);
router.post('/subAdmin/:id', adminSubAdmin.createAbility);
router.post('/deleteSubAdmin/:id', adminSubAdmin.destroy);
router.get('/subAdmin-select', adminSubAdmin.showAdmins);
router.get('/subAdmin-view/:id', adminSubAdmin.viewSubAdmin);
router.put('/subAdmin-app-delete/:id', adminSubAdmin.removeSubAdmin);
router.get('/app-select-sub', adminSubAdmin.showApp);
router.put('/add-app/:id', adminSubAdmin.addAppToSubAdmin);
router.put('/subAdmin-disable/:id', adminSubAdmin.onSubAdminDisabled);
router.put('/subAdmin-enable/:id', adminSubAdmin.onSubAdminEnable);

//
// admin/employee
router.get('/subAdmin-employees', auth, adminEmployee.employeesForSubAdmin);
router.get('/admin/employees', adminEmployee.index);
router.get('/admin/employee/:id', adminEmployee.show);
router.put('/admin/employee/inactive/:id', adminEmployee.inActive);
router.put('/admin/employee/:id', adminEmployee.updatePosition);
router.put('/admin/employeeNotes/:id', adminEmployee.addNotes);

// admin/applicationForm
router.get('/subAdmin-application', auth, adminApplicationController.applicationForSubAdmin);
router.get('/admin/applications', adminApplicationController.index);
router.get('/admin/application/:id', adminApplicationController.show);
router.put('/admin/application/hired/:id', adminApplicationController.hired);
router.put('/admin/application/decline/:id', adminApplicationController.decline);
router.put('/admin/application/active/:id', adminApplicationController.active);

// admin/message
router.get('/admin/messages', auth, adminMessage.allMessage);
router.post('/admin/message', auth, adminMessage.sendMessage);
router.post('/subadmin-help', auth, adminMessage.helpMessageBySubadmin);
router.post('/subadmin-reply', auth, adminMessage.replyMessageBySubAdmin);
router.post('/reply', auth, adminMessage.replyMessage);
router.get('/admin/chatUsers', adminMessage.getChatUser);
router.post('/adminReply/:id', auth, adminMessage.adminReplyMessage);

// admin/noticeOFIntent
router.get('/subadmin-noticeofintents', auth, adminNoticeOfIntent.noticeOfIntentBySubAdmin);
router.get('/admin/noticeofintents', adminNoticeOfIntent.index);
router.post('/admin/create-notice', auth, adminNoticeOfIntent.createCommissionedAdmin);

router.get('/subAdmin-commissioned', auth, adminNoticeOfIntent.completedAndCommissionedBySubAdmin);
router.get('/subAdmin-inProgress', auth, adminNoticeOfIntent.inProgressBySubAdmin);
router.get('/subAdmin-project', auth, adminNoticeOfIntent.allProjectBySubAdmin);

router.get('/admin/commissioned', adminNoticeOfIntent.completedAndCommissioned);
router.get('/admin/inProgress', adminNoticeOfIntent.inProgressIntent);
router.get('/admin/projects', adminNoticeOfIntent.allProjectIntent);

router.get('/admin/noticeofintent/:id', adminNoticeOfIntent.show);
router.get('/admin/approvednotice', adminNoticeOfIntent.approved);
router.put('/admin/noticeofintent/:id', adminNoticeOfIntent.update);
router.get('/successnotice-subadmin', auth, adminNoticeOfIntent.successfullBySubAdmin);
router.get('/admin/successnotice', adminNoticeOfIntent.successfull);
router.put('/admin/tocommissioned/:id', adminNoticeOfIntent.toCommissioned);
router.put('/admin/tocompleted/:id', adminNoticeOfIntent.toCompleted);
router.put('/admin/toInProgress/:id', adminNoticeOfIntent.toInProgress);

router.get('/admin/paidnotice', adminNoticeOfIntent.paid);
router.post('/admin/noticeofintent', adminNoticeOfIntent.create);
router.get('/subadmin-users', auth, adminNoticeOfIntent.AllUserBySubAdmin);
router.get('/admin/users', adminNoticeOfIntent.AllUser);
router.delete('/admin/noticeOfIntent/:id', adminNoticeOfIntent.destroy);

// admin/benefit
router.get('/subAdmin-benefits', auth, adminBenefit.benefitsBySubAdmin);
router.get('/admin/benefits', adminBenefit.index);
router.delete('/admin/benefit/:id', adminBenefit.deleteBenefit);
router.get('/admin/user-benefit/:id', adminBenefit.allUserBenefits);

router.post('/admin/benefit', adminBenefit.create);
router.post('/admin/addbenefit/:id', adminBenefit.addBenefit);

// admin/payment
router.post('/payment/:id', upload.single('receipt'), adminPayment.uploadReceipt);
router.get('/payment/:id', adminPayment.getPayment);
router.get('/admin/payments', adminPayment.paidAccount);
router.get('/payment', auth, adminPayment.allPayment);

// admin/reward
router.get('/admin/rewards', adminReward.index);
router.put('/admin/reward-status/:id', adminReward.changeRewardStatus);

router.post('/admin/reward', adminReward.create);
router.get('/admin/reward/:id', adminReward.show);
router.get('/subadmin-rewardUsers', auth, adminReward.getUserBySubAdmin);
router.get('/admin/rewardUsers', adminReward.getUser);
router.put('/admin/reward/:id', adminReward.edit);

// admin/report
router.get('/admin/report', adminReport.getReport);

// employee/noticeOfIntent

router.get('/employee/noticeofintent', auth, employeeNoticeOfIntent.notice);
router.get('/employee/projects', auth, employeeNoticeOfIntent.project);
router.post('/employee/noticeofintent', auth, employeeNoticeOfIntent.addNotice);
router.get('/employee/approvednoticeofintent', auth, employeeNoticeOfIntent.approved);
router.put('/employee/successNoticeOfIntent/:id', auth, employeeNoticeOfIntent.toSuccessFull);

// employee/reward
router.get('/employee/reward/:id', auth, employeeReward.getReward);
router.get('/employee/allRewards', auth, employeeReward.allReward);
router.get('/employee/completed', auth, employeeReward.getCompleted);

// employee/benefit
router.get('/employee/benefit', auth, adminBenefit.assigned);

// notification
router.get('/notifications', adminNotification.index);
router.post('/notification', adminNotification.create);
router.put('/notification', adminNotification.makeRead);

/// Profile
router.get('/profile', auth, profile.getProfile);
router.get('/role', auth, profile.getRole);

// Contracts
router.post('/upload/:id', upload.single('contract'), contract.uploadContract);
router.get('/upload/:id', contract.downloadFile);
router.get('/contracts', auth, contract.index);
router.get('/allContracts/:id', contract.allContract);

export default router;
