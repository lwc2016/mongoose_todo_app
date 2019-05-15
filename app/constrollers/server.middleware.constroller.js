const redisClient = require("../../config/redis.js");
const env = require("../../config/env.config.js");
exports.auth = (req, res, next)=>{
	let token = req.headers.token;
	let uid = req.headers.uid;
	if(token && uid){
		redisClient.get(token, (err, value)=>{
			if(err) return res.json({code: 1003, errorMsg: "服务器错误"});
			if(value && value == uid){
				redisClient.expire(token, env.redisExpire);
				next();
			}else{
				return res.json({code: 1004, errorMsg: "请重新登录"});
			}
		});
	}else{
		return res.json({code: 1004, errorMsg: "请重新登录"});
	};
};