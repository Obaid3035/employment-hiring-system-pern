import { Op } from 'sequelize';
import { JobListing } from '../../../../index';

class AdminJobListingController {
  async index(req, res, next) {
    try {
      const { jobTitle } = req.query;
      const { jobCountry } = req.query;
      const { jobState } = req.query;
      const { jobCity } = req.query;

      let activeJobs;

      if (jobTitle && jobCountry && jobState && jobCity) {
        activeJobs = await JobListing.findAll({
          where: {
            jobTitle: { [Op.like]: `%${jobTitle}%` },
            jobCountry: { [Op.like]: `%${jobCountry}%` },
            jobState: { [Op.like]: `%${jobState}%` },
            jobCity: { [Op.like]: `%${jobCity}%` },

            jobStatus: 'Active',
          },
        });
      } else {
        activeJobs = await JobListing.findAll({
          where: {
            jobStatus: 'Active',
          },
        });
      }
      // const inActiveJobs = await JobListing.findAll({
      //   where: { jobStatus: 'inActive' },
      // });
      res.status(200).json({ activeJobs });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      await JobListing.create(req.body);
      res.status(201).json({ saved: 'true' });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const jobId = req.params.id;
      const job = await JobListing.findByPk(jobId);
      await job.update(req.body);
      res.json('Job Updated Successfully');
    } catch (e) {
      next(e);
    }
  }

  async show(req, res, next) {
    try {
      const jobId = req.params.id;
      const job = await JobListing.findOne({
        where: { id: jobId },
        attributes: ['jobCountry', 'jobState', 'jobCity', 'jobTitle', 'jobDescription', 'jobBenefit', 'jobRequirement'],
      });
      res.json(job);
    } catch (e) {
      next(e);
    }
  }

  async destroy(req, res, next) {
    try {
      const jobId = req.params.id;
      const job = await JobListing.findByPk(jobId);
      job.jobStatus = 'inActive';
      await job.save();
      res.status(200).json({ deleted: true });
    } catch (e) {
      next(e);
    }
  }
}

export default AdminJobListingController;
