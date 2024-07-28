// nodemailer.js
const nodemailer = require('nodemailer');
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = require('./keys');

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + options.subject);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = sendEmail;
