const nodemailer = require("nodemailer");

require("dotenv").config();


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
})


module.exports.forgetMail = async (receiever, name, currPassword, forgetLink) => {
  const htmlContent = `
  <p>Hi ${name},</p>
  <p>You requested to reset your password. Your current password is <strong>${currPassword}</strong>.</p>
  <p>Click the link below to reset your password:</p>
  <a href="${forgetLink}" target="_blank">${forgetLink}</a>
  <p>If you did not request this, please ignore this email.</p>
  <p>Thanks,</p>
  <p>EasyStay Team</p>
`;
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: receiever,
    subject: "Forget Password",
    html: htmlContent,
  });

  return info;

}
