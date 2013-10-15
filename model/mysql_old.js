/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-27
 * Time: 下午3:27
 * To change this template use File | Settings | File Templates.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'blog_nodejs',
    port: 3306
});
conn.connect();
var selectSQL = 'select * from users limit 10';
conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);

    conn.query(selectSQL, function(err1, rows1){
        if(err1){throw err1;}
        console.log('select ==> ');
        for(var i in rows1){
            console.log(rows1[i])
        }

    })
});

