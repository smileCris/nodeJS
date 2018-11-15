var express = require('express');
var app = express();
var fs = require("fs");

// 添加新用户数据
var user = {
  "user4": {
    "name": "cris",
    "password": "password4",
    "profession": "student",
    "id": 4
  }
}

// 显示所有用户数据
app.get('/listUsers', function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log(data);
    res.end(data);
  });
})

// 添加新用户
app.get('/addUser', function (req, res) {
  // 首先读取已存在用户
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    // JSON数据转换为js对象
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    // js对象转换为JSON
    res.end(JSON.stringify(data));
  });
})

// 删除用户
var id = 1;
app.get('/deleteUser', function (req, res) {
  // 首先读取已存在用户
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    delete data[`user${id}`];
    console.log(data);
    // js对象转换为JSON
    res.end(JSON.stringify(data));
  });
})

// 显示用户详情
// 如果在同一个 server.js 里创建多个 RESTful API ，/:id需要放在最后，因为它会拦截其他的请求
app.get('/:id', function (req, res) {
  // 首先读取已存在用户
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    var user = data["user" + req.params.id]
    console.log(user);
    // js对象转换为JSON
    res.end(JSON.stringify(user));
  });
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为  http://127.0.0.1:8080")
})