const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// Base Entry
app.get("/", (req, res) => {
	res.status(200).send("Hello world");
});

// Route imports
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/register", require("./routes/register"));

// Serve static assets in prod
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

module.exports = app;
