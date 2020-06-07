const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

Router.get("/", auth, (req, res) => {
	res.json({ msg: "Getting bills" });
});

Router.post("/", auth, (req, res) => {
	res.json({ msg: "Posting bills" });
});

Router.put("/:d", auth, (req, res) => {
	res.json({ msg: "Posting bills" });
});

Router.delete("/:id", auth, (req, res) => {
	res.json({ msg: "Deleting bill" });
});

module.exports = Router;
