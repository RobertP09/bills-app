const express = require("express");
const Router = express.Router();
const Bill = require("../models/Bill");
const auth = require("../middleware/auth");

Router.get("/", auth, (req, res) => {
	res.json({ msg: "Getting bills" });
});

Router.post("/", auth, async (req, res) => {
	const { name, date, amount } = req.body;

	try {
		const bill = new Bill({
			user: req.user.id,
			name,
			date,
			amount,
		});
		console.log(bill);
		await bill.save();
		let response = [bill, { msg: "Bill Created" }];
		res.status(201).send(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

Router.put("/:d", auth, (req, res) => {
	res.json({ msg: "Posting bills" });
});

Router.delete("/:id", auth, (req, res) => {
	res.json({ msg: "Deleting bill" });
});

module.exports = Router;
