const userController = require("../constrollers/server.user.constroller.js");

module.exports = (app)=>{
	app.route("/user/register").post(userController.create);
	app.route("/user/login").post(userController.login);
};