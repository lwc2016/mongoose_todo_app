const todoController = require("../constrollers/server.todo.constroller.js");
const middlewareController = require("../constrollers/server.middleware.constroller.js");
module.exports = (app)=>{
	/*------添加todo接口-----*/
	// 请求方式：post, 请求参数：content
	app.route("/todo/add").post(middlewareController.auth, todoController.create);

	/*------获取todo列表接口---------*/
	// 请求方式：get/post， 请求参数：pageNo(默认1), pageSize(默认10)
	app.route("/todo/list").get(middlewareController.auth, todoController.query);
	app.route("/todo/list").post(middlewareController.auth, todoController.query);

	/*------获取todo详情接口-----------*/
	// 请求方式：get/post，请求参数：id(必须填写)
	app.route("/todo/detail").get(middlewareController.auth, todoController.detail);
	app.route("/todo/detail").post(middlewareController.auth, todoController.detail);

	/*------删除todo接口-------------*/
	// 请求方式：post，请求参数：id(必须填写)
	app.route("/todo/delete").post(middlewareController.auth, todoController.delete);

	/*------更新todo状态接口-------------*/
	// 请求方式：post，请求参数：id, content
	app.route("/todo/update").post(middlewareController.auth, todoController.update);
};
