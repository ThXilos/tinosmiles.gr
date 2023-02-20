const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmailCustomer = require("./utils/sendEmailCustomer.js");
const sendEmailCompany = require("./utils/sendEmailCompany.js");
const app = express();

//Midleware

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//create route

app.get("/", (req, res) => {
  res.send("Server is up");
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
        <p>Pickup-Date: ${pickupDate} at ${pickupTime} and return-Date: ${returnDate} at ${returnTime}</p>
        <p>Pickup from ${pickupLocation}</p>
      </div>
    
    `;
    const message = `
    <html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0;">
<meta name="format-detection" content="telephone=no"/>
<style>
body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
#outlook a { padding: 0; }
.ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }

 @media all and (min-width: 560px) {
.container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
}
a, a:hover {
	color: #127DB3;
}
.footer a, .footer a:hover {
	color: #999999;
}
</style>
<title>Tinos Miles auto-reply</title>

</head>
<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #F0F0F0;
	color: #000000;"
	bgcolor="#F0F0F0"
	text="#000000">
<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
	bgcolor="#F0F0F0">
<table border="0" cellpadding="0" cellspacing="0" align="center"
width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0;width: inherit;max-width: 560px;" class="wrapper">

<tr>
<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;padding-top: 20px;padding-bottom: 20px;">
<div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
			color: #F0F0F0;" class="preheader">
				Inquiry confirmation email</div>
</td>
</tr>


</table>


<table border="0" cellpadding="0" cellspacing="0" align="center"
	bgcolor="#FFFFFF"
	width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="container">


  <tr>
    <td style="border-radius:10px 10px 0 0;background-color:#6ac1b7;padding:5px 0;">
            <a target="_blank" style="text-decoration: none;"
				href="https://www.tinosmiles.gr"><img border="0" vspace="0" hspace="0"
				src="/images/tinosmiles_logo_site_400x100.png"
				width="400" height="100"
				alt="Logo" title="Logo" style="
				color: #000000;
				font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>

    </td>
  </tr>
	<tr>
		<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0;padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
			padding-top: 25px;
			color:#0a9695;
			font-family: sans-serif;" class="header">
				Hi, ${name}
		</td>
	</tr>
	

	<tr>
		<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0 0 1rem 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">
				Thank you for contacting Tinos Miles with the following inquiry:
		</td>
	</tr>
  <tr>
  	<td>
       <ul align="left" valign="top" style="list-style:none; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 16px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #777777;
			font-family: sans-serif;" class="subheader">
         <li style="margin-bottom:1em">Pick-up Location: <span style="font-weight:bold;">${pickupLocation}</span></li>
 <li style="margin-bottom:1em">Pick-up Date/Time:<span style="font-weight:bold;"> ${pickupDate}</span> at <span style="font-weight:bold;">${pickupTime}</span></li>
 <li style="margin-bottom:1em">Return Date/Time:<span style="font-weight:bold;"> ${returnDate}</span> at<span style="font-weight:bold;">${returnTime}</span></li>
</ul>
		</td>
	</tr>
<tr>
		<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0 0 1rem 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">
				We will get back to you as soon as possible.
		</td>
	</tr>

	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><a target="_blank" style="text-decoration: none;"
			href="https://tinosmiles.gr"><img border="0" vspace="0" hspace="0"
			src="https://www.tinosmiles.gr/wp-content/uploads/2021/03/Start-Exploring.jpg"
			alt="Please enable images to view this content" title="Hero Image"
			width="560" style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"/></a></td>
	</tr>

	<!-- PARAGRAPH -->
	<!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 16px; font-weight: 600; line-height: 160%;
			padding-top: 25px; 
			color: #0a9695;
			font-family: sans-serif;" class="paragraph">
				In the meantime&nbsp;click&nbsp;the button below to check out&nbsp;a&nbsp;our guide from Tinos&nbsp;with our tips&nbsp;on what to see and where to go.
     
		</td>
	</tr>

	<!-- BUTTON -->
	<!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button"><a
			href="#" target="_blank" style="text-decoration: underline;">
				<table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
					bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;"
					href="https://www.tinosmiles.gr/tinos-miles/guide-to-tinos-island/">
						Guide to Tinos
					</a>
			</td></tr></table></a>
		</td>
	</tr>

	<!-- LINE -->
	<!-- Set line color -->
	<tr>	
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line"><hr
			color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
		</td>
	</tr>

	<!-- LIST -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%;" class="list-item"><table align="center" border="0" cellspacing="0" cellpadding="0" style="width: inherit; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;">
			
			<!-- LIST ITEM -->
			<tr>

				<!-- LIST ITEM IMAGE -->
				<!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
				<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0;
					padding-top: 30px;
					padding-right: 20px;"><img
				border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;
					color: #000000;"
					src="https://www.tinosmiles.gr/wp-content/uploads/2021/03/information.png"
					alt="how to icon" title="Info Tinos Island"
					width="50" height="50"></td>

				<!-- LIST ITEM TEXT -->
				<!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
				<td align="left" valign="top" style="font-size: 17px; font-weight: 400; line-height: 160%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
					padding-top: 25px;
					color: #000000;
					font-family: sans-serif;" class="paragraph">
						<a href="#" target="_blank" style="text-decoration:none"><b style="color: #333333;">How to get to Tinos</b></a><br/>
					Get some information on how to travel to Tinos, accomendation prices, car rental prices, tickets and more.
				</td>

			</tr>

			<!-- LIST ITEM -->
			<tr>

				<!-- LIST ITEM IMAGE -->
				<!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
				<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0;
					padding-top: 30px;
					padding-right: 20px;"><img
				border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;
					color: #000000;"
					src="https://www.tinosmiles.gr/wp-content/uploads/2021/03/info.png"
					alt="covid-19 responce" title="covid-19 responce"
					width="50" height="50"></td>

				<!-- LIST ITEM TEXT -->
				<!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
				<td align="left" valign="top" style="font-size: 17px; font-weight: 400; line-height: 160%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
					padding-top: 25px;
					color: #000000;
					font-family: sans-serif;" class="paragraph">
						<a href="https://www.tinosmiles.gr/tinos-miles/covid-19/" target="_blank" style="text-decoration:none"><b style="color: #333333;">Our responce to the covid-19</b></a><br/>
						Find out more on how we take measures to assure your safety and those around you.
				</td>

			</tr>

		</table></td>
	</tr>

	<!-- LINE -->
	<!-- Set line color -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line"><hr
			color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
		</td>
	</tr>

	<!-- PARAGRAPH -->
	<!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 20px;
			padding-bottom: 25px;
			color: #000000;
			font-family: sans-serif;" class="paragraph">
				Have a&nbsp;question? <a href="mailto:contact@tinosmiles.gr" target="_blank" style="color: #127DB3; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 160%;">contact@tinosmiles.gr</a>
		</td>
	</tr>

<!-- End of WRAPPER -->
</table>

<!-- WRAPPER -->
<!-- Set wrapper width (twice) -->
<table border="0" cellpadding="0" cellspacing="0" align="center"
	width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="wrapper">

	<!-- SOCIAL NETWORKS -->
	<!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
	<tr>
    		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="social-icons"><table
			width="256" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse: collapse; border-spacing: 0; padding: 0;">
			<tr>
				<!-- ICON 1 -->
				<td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
					href="https://www.facebook.com/tinossmiles/"
				style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
					color: #000000;"
					alt="F" title="Facebook"
					width="44" height="44"
					src="https://www.tinosmiles.gr/wp-content/uploads/2021/03/facebook.png"></a></td>
				<!-- ICON 4 -->
				<td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
					href="https://www.instagram.com/tinosmiles/"
				style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
					color: #000000;"
					alt="tinos miles instagram link" title="Instagram"
					width="44" height="44"
					src="https://www.tinosmiles.gr/wp-content/uploads/2021/03/instagram.png"></a></td>

			</tr>
			</table>
		</td>
	</tr>


	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 12px; font-weight: 400; line-height: 150%;
			padding-top: 20px;
			padding-bottom: 20px;
			color: #999999;
			font-family: sans-serif;" class="footer">

				Tinos Miles&nbsp;|&nbsp;Car Rental Services &nbsp;|&nbsp;Ag.markos,     Tinos 84200<br/>GNTO Reg. No:1178E81000946601&nbsp;|&nbsp;
      <a href="tel:+30 6944187668" target="_blank" style="text-decoration: none; color: #999999; font-family: sans-serif; font-size: 12px; font-weight: 400; line-height: 150%;">Tel:+30 694 4187 668</a>
	</td>
	</tr>

</table>
</td></tr></table>

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
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
