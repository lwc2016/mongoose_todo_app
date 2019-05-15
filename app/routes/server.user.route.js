const userController = require("../constrollers/server.user.constroller.js");

module.exports = (app)=>{
	// 请求方式：post， 请求参数：username， password
	app.route("/user/register").post(userController.create);
	// 请求方式：post，请求参数：username， password
	app.route("/user/login").post(userController.login);
};