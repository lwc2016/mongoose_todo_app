const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");

module.exports = ()=>{
	/*--------实例化express---------*/
	const app = express();

	/*--------打印请求日志-----------*/
	app.use(logger("dev"));

	/*--------配置静态文件路径---------*/
	app.use(express.static(path.join(__dirname, "public")));

	/*--------解析applicatin/json格式数据--------------*/
	app.use(bodyParser.json());

	/*--------解析application/x-www-form-urlencode格式数据------*/
	app.use(bodyParser.urlencoded({extended: false}));

	/*--------解析cookie数据-------------*/
	app.use(cookieParser());

	/*--------解析session数据-------------*/
	app.use(session({
		secret: "react_todo_app",
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 24 * 60 * 60 * 1000 }
	}));
	
	/*---------配置路由--------*/
	require("../app/routes/server.todo.route.js")(app);
	require("../app/routes/server.user.route.js")(app);

	/*---------捕获404错误------------*/
	app.use((req,res,next)=>{
		let err = new Error("Error: 404, the source is not found!");
		err.status = 404;
		next(err);
	});

	/*---------捕获500错误------------*/
	app.use((err, req, res, next)=>{
		console.log(err);
		res.status(err.status || 500).send(err.status == 404 ? err.message : "服务器错误");
		next();
	});
	return app;
};