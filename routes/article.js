/**
 * Created by jocyci on 2016/6/1.
 */
/**
 * Created by jocyci on 2016/6/1.
 */
var express = require('express');
var router = express.Router();

// 获取增加文章的表单
router.get('/add',function (req,res) {
    res.render('article/add',{});
});
// 提交增加文章的表单
router.post('/add',function (req,res) {
    res.send('post add');
});

module.exports = router;