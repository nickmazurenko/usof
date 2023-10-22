const nodemailer = require('nodemailer');
const config = require('../config/keys.config');
/**
 * @desc sends email to a given user with the subject and link
 * 			 for some confirmation purposes
 * @param {String} email email to send mail to
 * @param {String} subject the subject of the email
 * @param {Object} params api path and token to send as link
 */
const sendEmail = async (email, subject, { link, token }) => {
  try {
    const fullLink = subject === 'password reset' ? `${config.CLIENT_URL + link + token}` : `${config.EMAIL.LINK}${link}${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASSWORD,
      },
    });
    await transporter.sendMail({
      from: 'noreply@gmail.com',
      to: email,
      subject,
      html: `
				<p>
					Hi there!<br> Please click on the link for ${subject}.<br>
					<a href="${fullLink}">Click me!</a>
				</p>
				`,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = sendEmail;
