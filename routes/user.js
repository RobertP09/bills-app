const express = require("express");
const router = express.Router();
const { user_get } = require("../controller/userController");

// @route	/user
// @desc	Get user Info - Dashboard
// @access	Private
router.get("/", user_get);

module.exports = router;
