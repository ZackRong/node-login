// 引入依赖
var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
var sql = require('./login.js');

app.use(bodyParser.urlencoded({
	extended: true
}));

// 设置响应头
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers','x-requested-with,content-type,Access-Control-Allow-Origin');  
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 暴露接口
app.post('/user',function(req, res){
	var query = url.parse(req.url,true).query;
	switch(query.ctr){
		case 'add':
			sql.catchres({type:'INSERT',data:req.body},function(msg){
				res.send(msg);
			});
			break;
		case 'update':
			sql.catchres({type:'UPDATE',data:req.body},function(msg){
				res.send(msg);
			});
			break;
		case 'delete':
		    sql.catchres({type:'DELETE',data:req.body},function(msg){
				res.send(msg);
			});
			break;
		case 'login':
			sql.catchres({type:'SELECT',data:req.body},function(msg){
				res.send(msg);
			});
			break;
		default:
			res.send('undefined contrl!');
	}
	
});

// 监听端口
app.listen('8080',function(){
	console.log('listen at 8080')
})