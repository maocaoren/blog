/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-30
 * Time: 下午6:08
 * To change this template use File | Settings | File Templates.
 */
var mysql = require("./mysql");

function User(user){
    this.user_id = user.user_id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
};
module.exports =User;

/*存储用户信息*/
User.save = function(data, callback){
//    var  user = {
//        user_id:this.user_id,
//        username:this.username,
//        password:this.password,
//        email:this.email
//    };
    mysql.acquire(function(err, client){
        if(err){
            client.release();
            return callback(err);
        }
         client.query("INSERT INTO users SET ?",data,function(err, cb){
             if(cb.insertId){
                 data['user_id'] = cb.insertId;
                 var user = new User(data);
                 callback(err,user);
             }else{
                 callback(err,null);
             }
             mysql.release(client);
         });
    });
};

/*读取用户信息*/
User.get = function(username,password,callback){
    mysql.acquire(function(err, client){
//        if(err){
//            client.release();
//            return callback(err);
//        }
        client.query("SELECT * FROM users  WHERE username=? AND password=?",['user2','154'],function(err,data){
            console.log(data);
            if(data){
                var user = new User(data[0]);
                callback(err,user); //返回用户并登陆
            }else{
                callback(err,null);//不存在用户
            }
        })
    })
}

/*判断用户名是否存在*/
