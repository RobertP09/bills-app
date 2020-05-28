"use strict";

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.json("Hello world");
});

app.use("*", (req, res) => {
	res.json("404 not Found!");
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
