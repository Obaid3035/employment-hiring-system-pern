const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class jobListing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jobListing.hasOne(models.ApplicationForm);
    }
  }
  jobListing.init({
    jobStatus: {
      type: DataTypes.ENUM('Active', 'inActive'),
      defaultValue: 'Active',
      allowNull: false,
    },
    jobCountry: DataTypes.STRING,
    jobState: DataTypes.STRING,
    jobCity: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    jobDescription: DataTypes.STRING,
    jobBenefit: DataTypes.STRING,
    jobRequirement: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'jobListing',
  });
  return jobListing;
};
