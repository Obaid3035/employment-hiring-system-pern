import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const sendVerificationEmail = (email, password, name) => {
  sgMail
    .send({
      to: email, // Change to your recipient
      from: 'HR@sitchaglobalnetwork.com', // Change to your verified sender,
      templateId: 'd-1424cfb7adf840db8810f96075cc19b7',
      dynamic_template_data: {
        Subject: 'SGN',
        title: 'Password',
        Message: `Hello ${name},\n\n Your password is ${password}\n`,
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
export default sendVerificationEmail;
