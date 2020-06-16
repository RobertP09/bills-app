const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");
const auth = require("../middleware/auth");
const sendNotification = require("../utils/mailer");

// @route	GET /bill
// @desc	Gets all bills for user
// @access	Private
router.get("/", auth, async (req, res) => {
	try {
		console.log(req.user.id);

		const bills = await Bill.find({ user: req.user.id });
		//console.log(bills);
		res.send(bills);
	} catch (err) {
		console.error(err.message);
		let response = [
			err.message,
			{ completed: "Failure", msg: "Server Error" },
		];
		res.status(500).send(response);
	}
});

// @route	POST /bill
// @desc	Registers a bill to DB
// @access	Private
router.post("/", auth, async (req, res) => {
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
		console.error(err.message);
		let response = [
			err.message,
			{ completed: "Failure", msg: "Server Error" },
		];
		res.status(500).send("Server Error");
	}
});

// @route	PUT /bill/:id
// @desc	Updates a specific bill
// @access	Private
router.put("/:id", auth, (req, res) => {
	res.json({ msg: "Posting bills" });
});

// @route	DELETE /bill/:id
// @desc	Deletes a specific bill
// @access	Private
router.delete("/:id", auth, (req, res) => {
	res.json({ msg: "Deleting bill" });
});

module.exports = router;
