const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");




const sendEmail = async (email, subject, payload) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: subject,
      html: `<h1>Hi ${payload.name}</h1><p>Click on the link below to reset your password</p><a style='color: blue;' href='https://${payload.link}'>Reset Password</a>`
    }, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(info)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = sendEmail;