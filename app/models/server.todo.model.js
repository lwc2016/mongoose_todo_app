const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	content:{
		type: String,
		max: 20,
		required: true
	},
	status: {
		type: Number,
		enum: [0, 1],
		default: 0
	},
	createdTime: {
		type: Date,
		default: Date.now()
	},
	finishedTime: {
		type: Date
	},
	user:{
		type: mongoose.Schema.ObjectId,
		ref: "User"
	}
});

TodoSchema.pre("save", function(next){
	this.createdTime = Date.now();
	next();
});

const Todo = mongoose.model("Todo", TodoSchema);