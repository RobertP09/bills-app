const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
	res.json("Hello world");
});

// Route imports
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

// Catch 404s
app.use("*", (req, res) => {
	res.json("404 not Found!").status(404);
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
