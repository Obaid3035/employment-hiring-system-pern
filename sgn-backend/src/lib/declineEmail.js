import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const sendDeclineEmail = (email, name) => {
  console.log(email, name);
  sgMail
    .send({
      to: email, // Change to your recipient
      from: 'HR@sitchaglobalnetwork.com', // Change to your verified sender
      templateId: 'd-1424cfb7adf840db8810f96075cc19b7',
      dynamic_template_data: {
        Subject: 'SGN',
        title: 'Your Application',
        Message: `Dear ${name},\n
           Thank you for your interest in this position. Although impressed with your background and experience, we are viewing other candidates who better fit our needs.  Thanks again for your interest in being part of the Sitcha Global Network Workforce and best of luck in your job search.\n
          Best Regards,\n
          Human Resource\n
          HR@sitchaglobalnetwork.com`,
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
export default sendDeclineEmail;
