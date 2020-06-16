const express = require("express");
const router = express.Router();

// @route	/user
// @desc	Get user Info - Dashboard
// @access	Private
router.get("/", (req, res) => {
	res.json({ msg: "Welcome to User" });
});

module.exports = router;
