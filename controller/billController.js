const Bill = require("../models/Bill");
const sendNotification = require("../utils/mailer");

const bill_get = async (req, res) => {
	try {
		console.log(req.user.id);

		const bills = await Bill.find({ user: req.user.id });

		res.send(bills);
	} catch (err) {
		console.error(err.message);
		let response = [
			err.message,
			{ completed: "Failure", msg: "Server Error" },
		];
		res.status(500).send(response);
	}
};

const bill_post = async (req, res) => {
	const { name, date, amount, recurring } = req.body;

	try {
		const bill = new Bill({
			user: req.user.id,
			name,
			date,
			amount,
			recurring,
		});
		//console.log(bill);
		await bill.save();
		let response = [bill, { completed: "Success", msg: "Bill Created" }];
		res.status(201).send(response);
	} catch (err) {
		let response = [
			err.message,
			{ completed: "Failure", msg: "Server Error" },
		];
		res.status(500).send(response);
	}
};

const bill_put = async (req, res) => {
	const { name, date, amount, recurring } = req.body;

	// Build a bill object
	const billFields = {};
	if (name) billFields.name = name;
	if (date) billFields.date = date;
	if (amount) billFields.amount = amount;
	if (recurring) billFields.recurring = recurring;

	try {
		let bill = await Bill.findById(req.params.id);

		if (!bill) return res.status(404).json({ msg: "Bill not found " });

		if (bill.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized..." });
		}

		bill = await Bill.findByIdAndUpdate(
			req.params.id,
			{ $set: billFields },
			{ new: true }
		);

		let response = [bill, { completed: "Success", msg: "Bill updated" }];

		res.status(200).send(response);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
};

const bill_delete = async (req, res) => {
	try {
		let bill = await Bill.findById(req.params.id);

		if (!bill) return res.status(404).json({ msg: "Bill not found " });
		// Verify ownership
		if (bill.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized..." });
		}
		await Bill.findByIdAndRemove(req.params.id);

		let response = [{ completed: "Success", msg: "Bill removed" }];
		res.status(200).send(response);
	} catch (error) {
		let response = [
			err.message,
			{ completed: "Failure", msg: "Server Error" },
		];
		res.status(500).send(response);
	}
};

module.exports = {
	bill_get,
	bill_post,
	bill_put,
	bill_delete,
};
