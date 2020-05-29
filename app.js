const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");

// Connecting DB to app
connectDB();

app.use(express.json());

// Base Entry
app.get("/", (req, res) => {
	res.status(200).send("Hello world");
});

// Route imports
const userRoutes = require("./routes/user");
const registerRoutes = require("./routes/register");
app.use("/user", userRoutes);
app.use("/register", registerRoutes);

// Serve static assets in prod
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

module.exports = app;
