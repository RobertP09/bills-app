const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
	res.json({ msg: "Welcome to Register" });
});

module.exports = Router;
