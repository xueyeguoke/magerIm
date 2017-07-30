/**
 * Created by Administrator on 2017-07-11.
 */
var express = require('express');
var router = express.Router();

/* 聊天wss. */
router.get("/chat",function(ws,req){
    console.log("---------------送达chat.js------------------");
    //if(!req.session.user){                     //到达/home路径首先判断是否已经登录
    //    req.session.error = "请先登录"
    //   res.redirect("/login");                //未登录则重定向到 /login 路径
    //}
    res.render("home",{title:'Home'});         //已登录则渲染home页面
});
module.exports = router;
