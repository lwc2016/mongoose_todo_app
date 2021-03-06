const mongoose = require("mongoose");
const sha1 = require("sha1");
const UserSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdTime: {
		type: Date,
		default: Date.now()
	}
});

const User = mongoose.model("User", UserSchema);