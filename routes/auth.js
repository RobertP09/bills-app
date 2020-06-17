const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// @route    GET /auth
// @desc     Get a user
// @access   Private
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    POST /auth
// @desc     Authenticate user & get token
// @access   Public
router.post("/", async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) return res.status(400).json({ msg: "Invalid email" });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			config.get("jwtSecret"),
			{
				expiresIn: 360000,
			},
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
