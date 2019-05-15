const mongoose = require("mongoose");
const env = require("./env.config.js");

mongoose.Promise = global.Promise;
module.exports = ()=>{
	const db = mongoose.connect(env.mongodb, {useMongoClient: true});
	require("../app/models/server.todo.model.js");
	require("../app/models/server.user.model.js");
	return db;
};