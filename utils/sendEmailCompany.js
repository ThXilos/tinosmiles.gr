const nodemailer = require("nodemailer");

const sendEmailCompany = async (
  subject_service,
  message_service,
  send_to_service,
  sent_from,
  reply_to_customer
) => {
  //create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    from: process.env.EMAIL_USER,
  });

  //Configure Options
  const options = {
    from: sent_from,
    to: send_to_service,
    replyTo: reply_to_customer,
    subject: subject_service,
    html: message_service,
  };

  //Send the email

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmailCompany;
