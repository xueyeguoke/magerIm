var express = require('express');
var router = express.Router();
/* 聊天页面. */
router.get('/imserver', function(req, res, next) {
    res.render('index', { title: 'Express' });
});