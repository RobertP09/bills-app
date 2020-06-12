const mongoose = require("mongoose");

const BillSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
	},
	amount: {
		type: Number,
		required: true,
	},
	recurring: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model("bill", BillSchema);
