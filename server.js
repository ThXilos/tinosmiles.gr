const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const sendEmailCustomer = require("./utils/sendEmailCustomer.js");
const sendEmailCompany = require("./utils/sendEmailCompany.js");
const app = express();

//Midleware

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//create route

app.get("/", (req, res) => {
  res.send(`TinosMiles Service Running ${new Date()}`);
});

app.post("/api/sendemail", async (req, res) => {
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
	<p>Pick-up <strong>${pickupDate}</strong>  || Drop-off <strong>${returnDate}</strong></p>
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
	<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Tinos Miles auto-reply</title>
	<style>
	  
		h1 {
			color: #007bff;
			font-size: 24px;
			margin-bottom: 20px;
		}
		p {
			color: #333;
			margin-bottom: 10px;
		}
		ul {
			color: #333;
			margin-bottom: 10px;
			padding-left: 20px;
		}
		li {
			margin-bottom: 5px;
		}
     
	</style>
</head>
<body style="background-color:#dfe3ee;
			font-family: Arial, sans-serif;
			font-size: 16px;
			line-height: 1.5;
			padding: 20px;
			margin: 0;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;">
  <div style="background-color:#fff;
      width:500px;
      border-radius:9px;
      overflow:hidden;">
    <div style=" background-color:#6ac1b7;
      padding: 1rem 0;">
      <img src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677076389/tinosmiles.gr/tinosmiles_logo_site_400x100_lwb09n.png" alt="tinos miles logo" />
    </div>
    <div style="padding:0 1rem;">
      <p>Hi, [customer_name]</p>
      <ul>
        <li>Pick up location</li>
        <li>Pick up date & time</li>
        <li>Drop off date & time</li>
      </ul>
      <p>We will get back to you as soon as posible.</p>
    </div>
    <div class="image-container">
      <img src="https://res.cloudinary.com/dtekdjcan/image/upload/v1678453185/tinosmiles.gr/Start-Exploring_kfvklb.webp" alt="a car parked on a clif overlooking a beach" />
    </div>
    <div style="align-text:center;
      padding:0 1rem;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;">
      <p>In the meantime click the button below to check out a our guide from Tinos with our tips on what to see and where to go.</p>
      <p class="btn">Link to guide</p>
    </div>
    <div>
      <div style="display:flex;
      align-items:center;
      justify-content:center;
      padding: 0 1rem;
      gap:1rem;">
         <img src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677076389/tinosmiles.gr/info_kwvubh.png" alt="an icon of an exclamation meaning information" style="width:50px;
      align-self:flex-start;"/>
        <div>
          <p style="text-transform:capitalize;">How to get to Tinos</p>
          <p>Get some information on how to travel to Tinos, accomendation prices, car rental prices, tickets and more. </p>
        </div>
      </div>
      <div style="display:flex;
      align-items:center;
      justify-content:center;
      padding: 0 1rem;
      gap:1rem;">
         <img src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677076389/tinosmiles.gr/covid_info_zjr4zv.png" alt="an icon of a exclamation meaning warning" style=" width:50px;
      align-self:flex-start;"/>
        <div>
          <p style="text-transform:capitalize;">Our responce to the covid-19</p>
          <p>Find out more on how we take measures to assure your safety and those around you. </p>
        </div>
      </div>
      <div>
        <p>Have a question? <span>contact@tinosmiles.gr</span></p>
      </div>
    </div>
  </div>
  <div class="footer-container">
    <div class="social-icons">
      <p>facebook</p>
      <p>instagram</p>
    </div>
  </div>
</body>
</html>`;

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
