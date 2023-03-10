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

  const rentDays = dayjs(returnDate).diff(dayjs(pickupDate), "day");
  const highSeason = rentDays * 50;
  const lowSeason = rentDays * 40;
  const discountApplied = rentDays > 10;

  try {
    const send_to_service = process.env.EMAIL_USER;
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = process.env.EMAIL_USER;
    const reply_to_customer = email;
    const subject = "Tinos Miles Car Rental Services | Automated Response";
    const subject_service = `Car Inquiry - ${pickupDate} to ${returnDate} `;
    const message_service = `
      <div style="display:flex; flex-direction:column; gap:10px; font-size:16px">
        <p>Car Inquiry from ${name}</p>
        <p>Pickup-Date: ${pickupDate} at ${pickupTime}</p>
		<p>Return-Date: ${returnDate} at ${returnTime}</p>
        <p>Pickup from ${pickupLocation}</p>
		<p>Total Days: ${rentDays}</p>
		<p>Total Cost:</p> 
		<p>High Season Total ${discountApplied ? highSeason * 0.9 : highSeason}</p>
		<p>Low Season Total ${discountApplied ? lowSeason * 0.9 : lowSeason}</p>
		<p>${
      discountApplied > 10
        ? "10% Discount is applied"
        : "Discount is not applied"
    }</p>
	 </div>
    `;
    const message = `
		<html>
		<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0;">
		<style>
		body{
		background-color: #f1f3f9;
  		display: flex;
  		flex-direction: column;
  		justify-content: center;
  		align-items: center;
  		padding: 1rem 0;
  		gap: 2rem;
		}
	.--logo {
    	width: 400px;
  		}

  .--image {
    width: 400px;
  }

  .--info-image {
    width: 40px;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 0 1rem;
    max-width: 500px;
    background-color: #fff;
  }

  .logo-container {
    background-color: #6ac1b7;
    padding: 1rem;
    border-radius: 9px;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 0 0 1rem;
    font-size: 2rem;
  }

  .--welcome {
    font-weight: 600;
    color: #0a9695;
    font-size: 3rem;
  }

  .--subtitle {
    font-size: 1.8rem;
    letter-spacing: 0.8px;
    line-height: 1.2;
    color: #555;
  }

  .--list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    color: #555;
    padding: 1rem 0;
  }

  .img-container {
    background-image: url(https://res.cloudinary.com/dtekdjcan/image/upload/v1678453185/tinosmiles.gr/Start-Exploring_kfvklb.webp);
    background-size: cover;
    background-position: center;
    height: 400px;
  }

  .--guide {
    color: #0a9695;
    font-weight: 600;
    text-align: center;
    padding: 2rem;
    font-size: 1.6rem;
    line-height: 1.2;
  }

  .btn {
    align-self: center;
    color: #fff;
    font-size: 2rem;
    border-radius: 9px;
    background-color: #e67e22;
    width: 200px;
    border: none;
    padding: 2rem 1rem;
    transition: all 0.3s;
  }

  .btn:hover {
    cursor: pointer;
    background-color: #fda14f;
  }

  .--divider {
    border-bottom: 2px solid #ccc;
    margin: 2rem 3rem;
  }

  .--info-container {
    padding-top: 2rem;
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    max-width: 450px;
    align-self: center;
  }

  .--info-text-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .--small {
    font-size: 1.6rem;
  }

  .--text {
    font-size: 1.6rem;
  }

  .--footer {
    align-self: center;
    font-size: 1.6rem;
    padding: 1rem 0;
  }

  .--footer-text {
    text-align: center;
    font-size: 1.2rem;
    color: #555;
  }

  .social-container {
    display: flex;
    gap: 2rem;
  }
		</style>
		<title>Tinos Miles auto-reply</title>
		<body>
		<div class="main-container">
        <div class="logo-container">
          <img
            src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677076389/tinosmiles.gr/tinosmiles_logo_site_400x100_lwb09n.png"
            alt=""
            classe="--logo"
          />
        </div>
        <div class="text-container">
          <p class="--welcome">Hi, Theo</p>
          <p classe="--subtitle">
            Thank you for contacting Tinos Miles with the following inquiry:{" "}
          </p>
          <ul class="--list">
            <li>Pick-up Location: Hotel</li>
            <li>Pick-up Date/Time: 2023-02-28 at 10.00</li>
            <li>Return Date/Time: 2023-03-10 at 14.00</li>
          </ul>
          <p class="--subtitle">
            We will get back to you as soon as possible.{" "}
          </p>
        </div>
        <div class="img-container"></div>
        <div class="text-container">
          <p class="--subtitle --guide">
            In the meantime click the button below to check out a our guide from
            Tinos with our tips on what to see and where to go.
          </p>
          <button class="btn">Guide to Tinos</button>
          <div class="--divider"></div>
          <div class="--info-container">
            <img
              src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677076389/tinosmiles.gr/info_kwvubh.png"
              alt=""
              class="--info-image"
            />
            <div class="--info-text-container">
              <p class="--welcome --small">How to get to Tinos</p>
              <p class="--text">
                Get some information on how to travel to Tinos, accomendation
                prices, car rental prices, tickets and more.
              </p>
            </div>
          </div>
          <div class="--info-container">
            <img
              src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677076389/tinosmiles.gr/covid_info_zjr4zv.png"
              alt=""
              class="--info-image"
            />
            <div class="--info-text-container">
              <p class="--welcome --small">Our responce to the covid-19</p>
              <p class="--text">
                Find out more on how we take measures to assure your safety and
                those around you.
              </p>
            </div>
          </div>
          <div class="--divider"></div>
          <div class="--footer">Have a question? contact@tinosmiles.gr</div>
        </div>
      </div>
      <div class="social-container">
        <img
          src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677243765/tinosmiles.gr/instagram_ccav7w.png"
          alt=""
          class="--info-image"
        />
        <img
          src="https://res.cloudinary.com/dtekdjcan/image/upload/v1677243765/tinosmiles.gr/facebook_b5b6hr.png"
          alt=""
          class="--info-image"
        />
      </div>
      <div class=".--info-container">
        <p class="--footer-text">
          Tinos Miles | Car Rental Services | Ag.markos, Tinos 84200 GNTO Reg.
          <br />
          No:1178E81000946601 | Tel:+30 694 4187 668
        </p>
      </div>
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
