const express = require("express");
const Router = express.Router();
const User = require("../models/User");

Router.get("/", (req, res) => {
	res.status(200).send("Register Route");
});

Router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	const user = new User({
		name,
		email,
		password,
	});

	res.send(user).status(200);
});

module.exports = Router;
