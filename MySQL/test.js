var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'test'
})

connection.connect();

// 测试是否连接成功，成功打印 The solution is:  2
// connection.query('SELECT 1 + 1 AS soluction', function (error, results, fields) {
//   if(error) throw error;
//   console.log('The solution is: ', results[0].soluction);
// });

var checkSql = 'SELECT * FROM sysUsers';

// 查
connection.query(checkSql, function (err, result) {
  if (err) {
    console.log(`[SELECT ERROR] - ${err.message}`);
    return;
  }
  console.log('-------------------SELECT--------------------');
  console.log(result);
  console.log('---------------------------------------------\n\n');
})

var addSql = 'INSERT INTO sysUsers(name, password, profession) VALUES(?, ?, ?)';
var addSqlParams = ['Cris', 'password5', 'student'];

// 增
connection.query(addSql, addSqlParams, function (err, result) {
  if(err) {
    console.log(`[INSERT ERROR] - ${err.message}`);
    return;
  }
  console.log('-------------------INSERT--------------------');
  console.log('INSERT ID:',result.insertId);
  console.log('---------------------------------------------\n\n');
});

var modSql = 'UPDATE sysUsers SET name = ?, password = ? WHERE id = ?';
var modSqlParams = ['Lemon', 'password4', 4];

// 改
connection.query(modSql, modSqlParams, function(err, result) {
  if(err) {
    console.log(`[UPDATE ERROR] - ${err.message}`);
    return;
  }
  console.log('-------------------UPDATE--------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('---------------------------------------------\n\n');
})

var delSql = 'DELETE FROM sysUsers where id = 7';

// 删
connection.query(delSql, function (err, result) {
  if(err) {
    console.log(`[DELETE ERROR] - ${err.message}`);
    return;
  }
  console.log('-------------------DELETE--------------------');
  console.log('DELETE affectedRows',result.affectedRows);
  console.log('---------------------------------------------\n\n');
})

connection.end();

