const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const sendEmailCustomer = require("./utils/sendEmailCustomer.js");
const sendEmailCompany = require("./utils/sendEmailCompany.js");
const app = express();

const corsOptions = {
  origin: "https://tinosmiles.gr",
  optionSuccessStatus: 200,
};

//Midleware

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));

//create route

app.get("/", (req, res) => {
  res.send(`TinosMiles Service Running ${new Date()}`);
});

app.post("/api/sendemail", async (req, res) => {
  const origin = req.get("Origin");
  if (origin !== corsOptions.origin) {
    return res.status(403).send("Forbidden");
  }
  const {
    name,
    email,
    pickupDate,
    returnDate,
    pickupTime,
    returnTime,
    pickupLocation,
  } = req.body;

  let rentDays;
  rentDays = dayjs(returnDate).diff(dayjs(pickupDate), "day");
  if (!rentDays) {
    rentDays = 1;
  }

  const highSeason = rentDays * 50;
  const lowSeason = rentDays * 40;
  const discountApplied = rentDays > 10;

  try {
    const send_to_service = process.env.EMAIL_USER;
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = process.env.EMAIL_USER;
    const reply_to_customer = email;
    const subject_service = `Car Inquiry - ${pickupDate} to ${returnDate} `;
    const message_service = `
	<html>
	<head>
	<title>Request from Tinos Miles contact form</title>
	</head>
	<body>
	<h2>Request from: <strong>${name}</strong></h2>
	<p>Pick-up <strong>${pickupDate} at ${pickupTime}</strong>  || Drop-off <strong>${returnDate} at ${returnTime}</strong></p>
	<p>Location <strong>${pickupLocation}</strong></p>
	<p>Total days: <strong>${rentDays}</strong> </p>
	<p>${
    discountApplied ? "<strong>10% discount applies</strong>" : "No discount"
  }</p>
	<p>Final cost for low season at 40e/day : ${
    discountApplied
      ? `<span style=" text-decoration: line-through;">${lowSeason}</span> <strong>${
          lowSeason * 0.9
        }</strong>`
      : `<strong>${lowSeason}</strong>`
  }</p>
	<p>Final cost for high season at 50e/day :  ${
    discountApplied
      ? `<span style=" text-decoration: line-through;">${highSeason}</span> <strong>${
          highSeason * 0.9
        }</strong>`
      : `<strong>${highSeason}</strong>`
  }</p>
	</body>
	</html>
	`;
    const subject = "Tinos Miles Car Rental Services | Automated Response";
    const message = `
	<!DOCTYPE html>
<html>
  <head>
    <title>Tinos Miles Car Rental Service</title>
  </head>
  <body style="background-color:#f7f7f7; font-family:Arial, sans-serif; font-size:16px; line-height:1.5; color:#333333;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
      <tr>
        <td align="center" bgcolor="#ffffff" style="border-radius:5px; box-shadow:0px 2px 5px rgba(0,0,0,0.1); padding:20px;">
          <h1 style="font-size:28px; margin:0;">Tinos Miles Car Rental Service</h1>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#ffffff" style="border-radius:5px; box-shadow:0px 2px 5px rgba(0,0,0,0.1); padding:20px;">
          <p>Hello, ${name}</p>
          <p>Thank you for contacting Tinos Miles with the following inquiry:</p>
          <p>Pick-up <strong>${pickupDate}</strong> at <strong>${pickupTime}</strong>  || Drop-off <strong>${returnDate}</strong> at <strong>${returnTime}</strong></p>
	<p>Location <strong>${pickupLocation}</strong></p>
          <p>Total days: <strong>${rentDays}</strong> </p>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#ffffff" style="border-radius:5px; box-shadow:0px 2px 5px rgba(0,0,0,0.1); padding:20px;">
          <p>&copy; Tinos Miles 2023</p>
        </td>
      </tr>
    </table>
  </body>
</html>
	`;

    await sendEmailCustomer(subject, message, send_to, sent_from, reply_to);
    await sendEmailCompany(
      subject_service,
      message_service,
      send_to_service,
      sent_from,
      reply_to_customer
    );

    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
