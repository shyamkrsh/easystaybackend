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


module.exports.appliedEmail = async (receiever, name, serviceTitle, servicePrice, location) => {
  const htmlContent = `
  <p>Hi ${name},</p>
  <p>You have booked  <strong>${serviceTitle}</strong>,<strong>Location : </strong>${location} monthly rent of this service is <strong> ₹ ${servicePrice} / per month </strong>.</p>
  <p>If you did not applied this, please ignore this email.</p>
  <p>Thanks,</p>
  <p>EasyStay Team</p>
`;
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: receiever,
    subject: "Booking services",
    html: htmlContent,
  });

  return info;

}
