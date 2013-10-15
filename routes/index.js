
/*
 * GET home page.
 */
var User = require("../model/user.js");
    Article = require("../model/article.js"),
    fun = require("../extends/function.js");

module.exports = function(app){    
    app.get('/',function(req,res){
        var page = req.query.p?parseInt(req.query.p) : 1;
        var type = req.query.type?req.query.type:null;
        Article.list(page, type, function(err, articles){
            if(articles){
                for(var i in articles){
                    articles[i]['time'] = new Date(articles[i]['art_created']).formatTime();
                }
                console.log(articles);
                Article.pager(1,'articles', {art_type:'php'},10,function(err, pages, total){
                    res.render('index', {
                        title: '主页',
                        page: page,
                        pages: pages,
                        total:total,
                        articles: articles
                    });
                });
            }
            if( err ){
                articles = [];
                res.render('index', {
                    title: '主页',
                    page: page,
                    articles: articles
                });
            }
        });
    });
    app.get('/record',function(req,res){

    });
    app.get('/reg',function(req,res){
        res.render('reg', { title: '注册' });
    });
    app.post('/reg',function(req,res){
    });
    app.get('/login',function(req,res){
        res.render('login', { title: '登录' });
    });
    app.post('/login',function(req,res){
    });
    app.get('/logout',function(req,res){
    });
    app.get('/post',function(req,res){
        res.render('post', { title: '发表' });
    });

    app.post('/post',function(req,res){
    }); 
}; 