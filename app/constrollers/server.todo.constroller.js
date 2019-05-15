const mongoose = require("mongoose");
const async = require("async");
const Todo = mongoose.model("Todo");


/*-----------创建-----------*/
exports.create = (req, res, next) => {
    if (!req.body.content) return res.json({ code: 1001, errorMsg: "缺少必要参数" });
    let uid = req.headers.uid;
    let content = req.body.content;
    let todo = new Todo({content, user: uid});
    todo.save((err) => {
        if (err) return res.json({ code: 1002, errorMsg: "参数错误" });
        return res.json({ code: 0, result: "" });
    });
};

/*-----------获取列表--------*/
exports.query = (req, res, next) => {
    let pageNo = parseInt(req.query.pageNo || req.body.pageNo) || 1;
    let pageSize = parseInt(req.query.pageSize || req.body.pageSize) || 10;
    let start = new Date().getTime();
    let uid = req.headers.uid;
    async.parallel({
    	list: (done) => {
            Todo.find().find({user: uid}).populate("user", "username").skip((pageNo - 1)*pageSize).limit(pageSize).exec((err, docs) => {
            	console.log("------list-----");
                if (err) done(err);
                done(null, docs);
            });
        },
        page: (done) => {
            Todo.find({user: uid}).count().exec((err, value) => {
            	console.log("------page------");
                if (err) done(err);
                let total = value ;
                let pageCount = Math.ceil(value/pageSize);
                done(null, {total , pageCount});
            });
        }
    }, (err, result)=>{
		if(err) return res.json({code: 1002, errorMsg: "参数错误"});
		return res.json({code: 0, result});
    });
};

/*---------详情-------------*/
exports.detail = (req, res, next) =>{
	let _id = req.query.id || req.body.id;
	if(!_id) return res.json({code: 1001, errorMsg: "缺少必要参数"});
	Todo.findOne({_id}, (err, doc)=>{
		if(err) return res.json({code: 1002, errorMsg: "数据库错误"});
		return res.json({code: 0, result: doc});
	});
};

/*---------删除--------*/
exports.delete = (req,res ,next)=>{
	let _id = req.body.id;
	if(!_id) return res.json({code: 1001, errorMsg:"缺少必要参数"});
	Todo.remove({_id}, (err)=>{
		if(err) return res.json({code:1002, errorMsg: "参数错误"});
		return res.json({code:0, result: ""});
	});
};

/*---------更新---------*/
exports.update = (req, res, next)=>{
	let _id = req.body.id;
	if(!_id) return res.json({code: 1001, errorMsg: "缺少必要参数"});
	Todo.findOne({_id}, (err, doc)=>{
		console.log(err);
		if(err) return res.json({code: 1002, errorMsg: "参数错误"});
		if(!doc) return res.json({code: 1003, errorMsg: "数据不存在"});
		if(doc){
			doc.status = doc.status === 0 ? 1 : 0;
			doc.save((err)=>{
				if(err) return json({code: 1002, errorMsg: "数据库错误"});
			});
		}
	});
};




