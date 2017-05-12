// 查询记录
// let sql = 'SELECT * FROM users'
// 插入记录
// let sql = "INSERT INTO users (user_name,user_password) VALUES ('rose','654321')"
// 修改
// let sql = "UPDATE users SET user_password='789526' WHERE user_name='rose'";
// 删除 
// let sql = "DELETE FROM users WHERE user_name = 'rose'";

//连接数据库
let mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '****',
	database:'users'
});
connection.connect(function(error,res){
	if(error){
		console.log('Connection error:'+error.message);
		return;
	}
	console.log('Connection sucessfully')
});

// 解析收到的数据
function toObj(str){
	let ary = str.split('|');
	let len = ary.length;
	let obj = {};
	for(let i = 0;i<len;i++ ){
		let _ary = ary[i].split(':');
		let item = _ary[0]
		_ary.splice(0,1);
		obj[item] = _ary.join('');
	};
	return obj;
}

// 查询数据库
function deal(sql,fn){
	connection.query(sql, function(err, result, fields) {
		if (err) {cosole.log(err); return;};
		console.log('The solution is: ', result);
		if(fn){
			fn(JSON.stringify(result));
		}
	});
}

// 给字符串加引号
function joineq(str){
	let _str = str.split(',');
	let len = _str.length;
	let res = ''
	for(let i = 0;i < len;i++){
		res = res + "'"+_str[i] + "',"
	}
	let result = res.substring(0,res.length-1);
	return result;
}

// 输出方法，处理各种请求
exports.catchres = function(req,fn){
	let {type, data} = req;
	data = toObj(data.data);
	switch(type){
		case 'SELECT':
			// 登录
			let sql = `SELECT ${data.selectItem} FROM users WHERE ${data.selectCol} = '${data.selectVal}'`;
			deal(sql,function(result){
				if(result === '[]'){
					fn('不存在这个用户');
				}else{
					result = JSON.parse(result);
					if(result[0].user_password === data.user_password){
						fn('登录成功')
					}else{
						fn('密码错误')
					}
				}}
				);
			break;
		// 注册
		case 'INSERT':
		let sql = `INSERT INTO users (${data.insertCol}) VALUES (${joineq(data.insertData)})`;
		deal(sql,function(){
			fn('注册成功')
		});
		break;
		// 更新
		case 'UPDATE':
			// 格式
			let sql = `SELECT user_password FROM users WHERE ${data.updateConditionCol} = '${data.updateConditionVal}'`;
			deal(sql,function(result){
				if(result === '[]'){
					fn('不存在这个用户');
				}else{
					result = JSON.parse(result);
					if(result[0].user_password === data.oldPassword){
						let sql = `UPDATE users SET ${data.updateCol}='${data.newPassword}' WHERE ${data.updateConditionCol} = '${data.updateConditionVal}'`;
						deal(sql,function(){
							fn('更新密码成功');
						})
					}else{
						fn('原密码输入错误');
					}
				}
			});
			break;
		// 删除
		case 'DELETE':
			// 格式
			let sql = `DELETE FROM users WHERE ${data.deleteCondition1}='${data.deleteVal1}' AND ${data.deleteCondition2}='${data.deleteVal2}'`
			deal(sql,function(){
				fn('删除用户成功')
			});
			break;
		// 没有就返回
		default: 
		return 0;
	}
}