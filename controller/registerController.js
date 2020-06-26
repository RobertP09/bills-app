const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email: email });

		if (user) res.status(400).json({ msg: "Account already exists" });

		user = new User({
			name,
			email,
			password,
		});

		const salt = await bcrypt.genSalt(11);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			config.get("jwtSecret"),
			{
				expiresIn: 36000,
			},
			(err, token) => {
				if (err) throw err;
				res.status(201).json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

module.exports = register;
