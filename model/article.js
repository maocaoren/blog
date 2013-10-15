/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-10
 * Time: 下午2:24
 * To change this template use File | Settings | File Templates.
 */
var mysql = require("./mysql.js"),
    redis = require("./redis.js");

function Article(){}

module.exports = Article;

Article.save = function(data,callback){
    var date = new Date();
    var title = data.title,
        content = data.content,
        type = data.type,
        day =  date.getTime();
    var field = [data.title, data.content, data.type, date.getTime()];
    mysql.acquire(function(err, client){
        client.query("INSERT INTO articles(art_title, art_content, art_type, art_created) VALUES(?, ?, ?, ?)",
            field,function(err,data){
            mysql.release(client);
            if(data.insertId){
                callback(err,data.insertId);
            }else{
                callback(err,null);
            }

        })
    });
};

Article.list = function(page,type,callback){
    mysql.acquire(function(err, client){
        var limit = (page - 1) + ',' +page*10;
        if( null == type ){
            client.query("SELECT * FROM articles LIMIT "+limit,function(err,data){
//                console.log(data);
                mysql.release(client);
                callback(err, data);
            })
        }else{
            client.query("SELECT * FROM articles WHERE art_type = ? LIMIT "+limit,type,function(err,data){
//                console.log(data);
                mysql.release(client);
                callback(err, data);
            });

        }

    });
};

//分页功能
Article.pager = function(page, table, condition, num, callback){
    var where, field=[];
    if( condition ){
        if( typeof condition  === "object" ){
            where = 'WHERE 1';
            for( var i in condition ){
                where += ' AND '+i  + '=?';
                field.push(condition[i]);
            }
        }else{
            where = 'WHERE ' + condition;
        }
    }
    mysql.acquire(function(err,client){
        client.query("SELECT count(*) as total FROM articles "+where,field,function(err, data){
            mysql.release(client);
            var total = 0;
            if(data[0]){
                total = data[0]['total'];
            }
            //计算出分页
            if( total < num ){
                callback(err, null, total);
            }else{
                var total_page = Math.ceil( total/page );
                var pages = {
                    'total_count':total,
                    'page_size':num,
                    'total_page':total_page,
                    'first_page':1,
                    'prev_page':((1==page) ? 1 : (page - 1)),
                    'next_page':((page == total_page) ? total_page : (page + 1)),
                    'last_page':total_page,
                    'current_page':page,
                    'all_page':[],
                    'offset':(page-1)*num,
                    'limit':num
                };
                var scope = 10;
                if( total_page <= scope ){
                    for(var i=1; i<=total_page; i++){
                        pages['all_page'].push(i);
                    }
                }else if( page <= scope/2 ){
                    for(var i=1; i<=scope; i++){
                        pages['all_page'].push(i);
                    }
                }else if( page <= (total_page - scope/2) ){
                    var right = page + parseInt(scope/2);
                    for(var i=right-scope+ 1;i<=right;i++){
                        pages['all_page'].push(i);
                    }
                }else{
                    for(var i=total_page-scope+ 1;i<=total_page;i++){
                        pages['all_page'].push(i);
                    }
                }
    //            console.log(pages);
                callback(err, pages, total);
            }
        })
    })
}

