const express = require("express");
const router = express.Router();
const register = require("../controller/registerController");

// @route	POST /register
// @desc	Creates user in Database
// @access	Public

router.post("/", register);

module.exports = router;
