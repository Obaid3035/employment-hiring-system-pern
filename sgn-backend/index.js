const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/src/config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.User = require('./src/app/models/user')(sequelize, Sequelize.DataTypes);
db.RoleDetail = require('./src/app/models/roledetail')(sequelize, Sequelize.DataTypes);
db.ApplicationForm = require('./src/app/models/applicationform')(sequelize, Sequelize.DataTypes);
db.EducationHistory = require('./src/app/models/educationhistory')(sequelize, Sequelize.DataTypes);
db.EmploymentHistory = require('./src/app/models/employmenthistory')(sequelize, Sequelize.DataTypes);
db.JobListing = require('./src/app/models/joblisting')(sequelize, Sequelize.DataTypes);
db.Reference = require('./src/app/models/reference')(sequelize, Sequelize.DataTypes);
db.NoticeOfIntent = require('./src/app/models/noticeOfIntent')(sequelize, Sequelize.DataTypes);
db.Benefit = require('./src/app/models/benefit')(sequelize, Sequelize.DataTypes);
db.Reward = require('./src/app/models/reward')(sequelize, Sequelize.DataTypes);
db.Contract = require('./src/app/models/contract')(sequelize, Sequelize.DataTypes);
db.Notification = require('./src/app/models/notification')(sequelize, Sequelize.DataTypes);
db.Payment = require('./src/app/models/payment')(sequelize, Sequelize.DataTypes);
db.Resume = require('./src/app/models/resume')(sequelize, Sequelize.DataTypes);
db.UserReward = require('./src/app/models/userreward')(sequelize, Sequelize.DataTypes);
db.Message = require('./src/app/models/message')(sequelize, Sequelize.DataTypes);
db.Quote = require('./src/app/models/quote')(sequelize, Sequelize.DataTypes);
db.File = require('./src/app/models/file')(sequelize, Sequelize.DataTypes);
db.GetInTouch = require('./src/app/models/getintouch')(sequelize, Sequelize.DataTypes);
db.UserBenefit = require('./src/app/models/userbenefit')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
