const CronJob = require("cron").CronJob;
const scheduleBill = require("./mailer");

let billInfo = [email, billName, daysTillDue];

const reminder = new CronJob(
	"0 */1 * * * *",
	() => {
		scheduleBill(billInfo);
	},
	null,
	true,
	"America/Los_Angeles"
);

module.exports = reminder;
