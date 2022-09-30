import { User, JobListing } from '../../../index';

const userOne = {
  id: 1,
  name: 'Mike',
  email: 'mike@example.com',

  applicationForm: {
    firstName: 'Mike',
    middleName: 'angel',
    lastName: 'Dam',
    streetAddress: '12321',
    zipCode: '123',
    phoneNumber: '213213',
    workedForSGN: true,
    workedForSGNExplain: 'sad',
    haveAnyFriendsAtSGN: false,
    haveAnyFriendAtSGNName: 'sad',
    age: true,
    presentYourIdentificationCard: true,
    pleadedFelony: true,
    pleadedFelonyExplain: 'sad',
    desiredSalary: 123,
    partTimeWork: true,
    fullTimeWork: false,
    daysAvailable: 'sad',
    essentialFunction: true,
    essentialFunctionExplain: 'sad',
  },
  employmentHistory: [
    {
      employerName: 'sad',
      telephoneName: '213',
      businessType: 'develop',
      address: 'sda',
      zipCode: 21,
      salary: 213,
      position: 'front',
      reasonOfLeaving: 'dsa',
      contactEmployer: true,
    },
  ],
  educationHistory: [
    {
      schoolType: 'College',
      schoolName: 'das',
      schoolAddress: 'sda',
      schoolZipCode: '213',
      yearsCompleted: 2,
      isGraduate: true,
      isForeignLanguage: true,
      foreignLanguage: 'sda',
    },
  ],
};

const jobs = {
  jobCountry: 'asd',
  jobState: 'sad',
  jobCity: 'sd',
  jobTitle: 'sad',
  jobDescription: 'sad',
};

const seedDatabase = async () => {
  await User.destroy({
    where: {},
    truncate: false,
  });
  await JobListing.destroy({
    where: {},
    truncate: false,
  });
  await JobListing.create(jobs);
  await User.create(userOne);
};

export default seedDatabase;
