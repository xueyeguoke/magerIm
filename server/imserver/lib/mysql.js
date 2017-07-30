var mysql=require("mysql");
var TEST_DATABASE = 'ddtTest';
var port=9201;

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: TEST_DATABASE,
    port: port
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;

/*
* 3，在js类使用如下
 var query=require("./lib/mysql.js");

 query("select 1 from 1",function(err,vals,fields){
 //do something
 });
* */