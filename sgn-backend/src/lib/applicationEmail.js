import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const sendApplicantEmail = (email, name) => {
  console.log(email, name);
  sgMail
    .send({
      to: email, // Change to your recipient
      from: 'HR@sitchaglobalnetwork.com', // Change to your verified sender
      templateId: 'd-1424cfb7adf840db8810f96075cc19b7',
      dynamic_template_data: {
        Subject: 'SGN',
        title: 'Your Application',
        Message: `Thank you for expressing interest
       in our company and employment with us. 
       This email serves as confirmation that your submission was successful,
       and we have received your online application.

       We are currently reviewing all applications. Should your application meet our needs, you will be contacted by a member of the Human Resources Department.

       Thank you, again, for your interest in our company. We do appreciate the time you invested in this application.`,
      },
    })
    .then(() => {
      console.log('Email sent');
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
export default sendApplicantEmail;
