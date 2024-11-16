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


module.exports.forgetMail = async(receiever, name, otp) => {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, 
      to: receiever,
      subject: "Forget Password", 
      text: `Hey ${name} you have requested to forget password, your OTP is ${otp}`,
    });

    return info;

  }

  forgetMail("sksh58573@gmail.com", "Shyam Kumar Sharma", 123456);