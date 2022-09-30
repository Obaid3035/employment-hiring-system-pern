import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const sendQuestionareEmail = (email, name) => {
  console.log(email, name);
  sgMail
    .send({
      to: email, // Change to your recipient
      from: 'HR@sitchaglobalnetwork.com', // Change to your verified sender
      templateId: 'd-1424cfb7adf840db8810f96075cc19b7',
      dynamic_template_data: {
        Subject: 'SGN',
        title: 'Thank You',
        Message: `Dear  ${name},\n
      Thank You for your time to fill out the Questionare.\n
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
export default sendQuestionareEmail;
