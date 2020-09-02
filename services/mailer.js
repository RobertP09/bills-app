const nodemailer = require("nodemailer");

const sendNotification = async (userInfo) => {
	const { email, billName, daysTillDue } = userInfo;
	try {
		// Creates test account if needed
		let testAccount = await nodemailer.createTestAccount();

		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // True for 465, else false for other ports
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
			},
		});

		// Send mail
		let info = await transporter.sendMail({
			from: "Bill-Reminder <bill-reminder@example.com>",
			to: `${email}`,
			subject: `${billName} is due soon`,
			text: `${billName} Is due and will be reported to the Credit Agencies in 30 days`,
			html: `<p>Payment Due in ${daysTillDue} Days</p>`,
		});

		// console.log("Message sent: %s", info.messageId);
		// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	} catch (err) {
		console.error(err.message);
		throw new Error("Problem sending email");
	}
};
module.exports = sendNotification;
