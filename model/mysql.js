/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-30
 * Time: 下午5:04
 * To change this template use File | Settings | File Templates.
 */
var generic_pool = require("generic-pool");

//noinspection JSValidateTypes
var mysql = generic_pool.Pool({
    name:"mysql",
    max:10,
    min:2,
    create:function(callback){
        var Client = require("mysql").createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database:'blog_nodejs',
            port: 3306
        });

        callback(null,Client);
    },
    destroy:function(Client){
        Client.end();
    }
});
module.exports = mysql;