import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const sendHiredEmail = (email, name) => {
  console.log(email, name);
  sgMail
    .send({
      to: email, // Change to your recipient
      from: 'HR@sitchaglobalnetwork.com', // Change to your verified sender
      templateId: 'd-1424cfb7adf840db8810f96075cc19b7',
      dynamic_template_data: {
        Subject: 'SGN',
        title: 'Welcome',
        Message: `Dear  ${name},\n
      We are pleased to extend the following offer of employment to you on behalf of Sitcha Global Network (SGN). You have been selected as the best candidate for our representative position. Congratulations!\n
      We believe that your knowledge, skills and experience would be an ideal fit for our team. We hope you will enjoy your role and make a significant contribution to the overall success of SGN.\n
      We will contact you within 24 hours regarding your position, training, commencement date, benefits, and monthly salary.
      Welcome to the family!\n
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
export default sendHiredEmail;
