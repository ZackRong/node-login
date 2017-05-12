// 创建一个xml对象
var xhr = new XMLHttpRequest();
// 发起请求的方法
function request({type,data}){
	var url = 'http://localhost:8080/user?ctr=' + type;
	xhr.open('POST',url,true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
	xhr.setRequestHeader("X-Requested-With","Access-Control-Allow-Headers");
	xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				var text = xhr.responseText;
				document.getElementById('result').innerText = text;
			}
		}
	};
	xhr.send(data)
};

// 绑定按钮
var login = document.getElementById('login');
var add = document.getElementById('add');
var del = document.getElementById('del');
var update = document.getElementById('update');
var updateCtr = document.getElementById('updateCtr');
var back = document.getElementById('back');

login.onclick = function(){
	var userName = document.getElementById('userName').value;
	var password = document.getElementById('password').value;
	var data = `data=selectItem:user_password|selectCol:user_name|selectVal:${userName}|user_password:${password}`;
	request({type:'login',data:data})
};
add.onclick = function(){
	var userName = document.getElementById('userName').value;
	var password = document.getElementById('password').value;
	var data = `data=insertCol:user_name,user_password|insertData:${userName},${password}`
	request({type:'add',data:data})
};
del.onclick = function(){
	console.log('del');
	var userName = document.getElementById('userName').value;
	var password = document.getElementById('password').value;
	var data = `data=deleteCondition1:user_name|deleteVal1:${userName}|deleteCondition2:user_password|deleteVal2:${password}`;
	request({type:'delete',data:data});
};
updateCtr.onclick = function(){
	document.getElementById('inputBox').style.display = 'none';
	document.getElementById('updateBox').style.display = 'block';
	document.getElementById('title').innerText = '修改用户密码';
	document.getElementById('result').innerText = '';
};
back.onclick = function(){
	document.getElementById('inputBox').style.display = 'block';
	document.getElementById('updateBox').style.display = 'none';
	document.getElementById('title').innerText = '用户登录';
	document.getElementById('result').innerText = '';
};
update.onclick = function(){
	var updateName = document.getElementById('updateName').value;
	var newPassword = document.getElementById('newPassword').value;
	var oldPassword = document.getElementById('oldPassword').value;
	var data = `data=updateCol:user_password|newPassword:${newPassword}|oldPassword:${oldPassword}|updateConditionCol:user_name|updateConditionVal:${updateName}`
	request({type:'update',data:data});
};
// 释放内存
login = null;
add = null;
del = null;
update = null;
updateCtr = null;
back = null;


// 登录
// xhr.send("data=selectItem:user_password|selectCol:user_name|selectVal:kobe|user_password:242424");
// 注册
// xhr.send("data=insertCol:user_name,user_password|insertData:james,230623");
// 更新
// xhr.send("data=updateCol:user_password|updateVal:852963|updateConditionCol:user_name|updateConditionVal:jack");
// 注销
// xhr.send("data=deleteCol:user_id|deleteVal:9");
