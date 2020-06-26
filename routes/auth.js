const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { auth_get, auth_post } = require("../controller/authController");

// @route    GET /auth
// @desc     Get a user
// @access   Private
router.get("/", auth, auth_get);

// @route    POST /auth
// @desc     Authenticate user & get token
// @access   Public
router.post("/", auth_post);

module.exports = router;
