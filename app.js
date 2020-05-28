"use strict";

const express = require("express");
const app = express();

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
	res.json("Hello world");
});

app.use("*", (req, res) => {
	res.json("404 not Found!");
});

// Serve static assets in prod
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

app.listen(PORT, HOST, () => {
	console.log(`Listening @ http://${HOST}:${PORT}`);
});
