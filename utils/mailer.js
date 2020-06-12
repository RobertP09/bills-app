const nodemailer = require("nodemailer");

const sendNotification = async () => {
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
			from: "Robert P <foo@example.com>",
			to: "rober9790@gmail.com",
			subject: "Test email",
			text: "Notfication of payment",
			html: `<p>Payment Due in X Days</p>`,
		});

		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	} catch (err) {
		console.error(err.message);
		throw new Error("Problem sending email");
	}
};
module.exports = sendNotification;
