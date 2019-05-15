const mongoose = require("mongoose");
const redisClient = require("../../config/redis.js");
const sha1 = require("sha1");
const User = mongoose.model("User");
const env = require("../../config/env.config.js");

/*-------创建用户--------*/
exports.create = (req, res, next)=>{
	if(!req.body.username || !req.body.password) return res.json({code: 1001, errorMsg: "缺少必要参数"});
	let username = req.body.username;
	let password = sha1(req.body.password);
	let user = new User({username, password});
	user.save((err)=>{
		console.log(err);
		if(err) return res.json({code: 1003, errorMsg: "数据库错误"});
		return res.json({code: 0, result: ""});
	});
};

/*-------登录------------*/
exports.login = (req, res, next)=>{
	if(!req.body.username || !req.body.password) return res.json({code: 1001, errorMsg: "缺少必要参数"});
	let username = req.body.username;
	let password = sha1(req.body.password);
	User.findOne({username, password}, (err,doc)=>{
		if(err) return res.json({code: 1003, errorMsg: "数据库错误"});
		if(doc){
			let token = sha1(doc.username + new Date().getTime());
			let uid = doc._id.toString();
			redisClient.set(token, uid);
			redisClient.expire(token, env.redisExpire);
			return res.json({code: 0, result: {token, uid}});
		}else{
			return res.json({code:1001, errorMsg: "用户名或密码错误"});
		};
	});
};
