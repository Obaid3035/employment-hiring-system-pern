import { Op } from 'sequelize';
import { JobListing } from '../../../index';

class JobListingController {
  async index(req, res, next) {
    try {
      const { jobTitle } = req.query;
      const { jobCountry } = req.query;
      const { jobState } = req.query;
      const { jobCity } = req.query;

      let jobList;

      if (jobTitle && jobCountry && jobState && jobCity) {
        jobList = await JobListing.findAll({
          where: {
            jobTitle: { [Op.like]: `%${jobTitle}%` },
            jobCountry: { [Op.like]: `%${jobCountry}%` },
            jobState: { [Op.like]: `%${jobState}%` },
            jobCity: { [Op.like]: `%${jobCity}%` },

            jobStatus: 'Active',
          },
        });
      } else {
        jobList = await JobListing.findAll({
          where: { jobStatus: 'Active' },
        });
      }
      res.status(200).json(jobList);
    } catch (err) {
      next(err);
    }
  }

  async show(req, res, next) {
    try {
      const jobID = req.params.id;
      const job = await JobListing.findByPk(jobID);

      res.status(200).json(job);
    } catch (err) {
      next(err);
    }
  }
}
export default JobListingController;
