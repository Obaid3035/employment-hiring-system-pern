import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';

const apiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey);

const sendForgotPasswordMail = (user) => {
  const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '20m' });

  sgMail
    .send({
      to: user.email, // Change to your recipient
      from: 'HR@sitchaglobalnetwork.com', // Change to your verified sender
      templateId: 'd-1424cfb7adf840db8810f96075cc19b7',
      dynamic_template_data: {
        Subject: 'Recover Password',
        title: 'Reset Password',
        Message: `Please click on the link below to recover your password Please Click on this link\n
        https://sitchaglobalnetwork.com/admin/resetPassword/${token}
			`,
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
export default sendForgotPasswordMail;
