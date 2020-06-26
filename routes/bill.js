const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
	bill_get,
	bill_post,
	bill_put,
	bill_delete,
} = require("../controller/billController");

// @route	GET /bill
// @desc	Gets all bills for user
// @access	Private
router.get("/", auth, bill_get);

// @route	POST /bill
// @desc	Registers a bill to DB
// @access	Private
router.post("/", auth, bill_post);

// @route	PUT /bill/:id
// @desc	Updates a specific bill
// @access	Private
router.put("/:id", auth, bill_put);

// @route	DELETE /bill/:id
// @desc	Deletes a specific bill
// @access	Private
router.delete("/:id", auth, bill_delete);

module.exports = router;
