const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})


const emailTemplatePath = path.join(__dirname, 'Email.html');

module.exports.sendMail = async (receiverEmail, name, subject) => {
    fs.readFile(emailTemplatePath, 'utf8', (err, htmlContent) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            return;
        }

        const withDynamicContent = htmlContent.replace(/{{name}}/g, name);

        const mailOptions = {
            from: process.env.GMAIL_FROM,
            to: receiverEmail,
            subject: subject,
            html: withDynamicContent,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    });
}
