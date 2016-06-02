/**
 * Created by jocyci on 2016/6/1.
 */
/**
 * Created by jocyci on 2016/6/1.
 */
var express = require('express');
var router = express.Router();
var model = require('../model');
var markdown = require('markdown').markdown;

router.get('/list/:pageNum/:pageSize',function (req,res) {
    var pageNum = parseInt(req.params.pageNum);// 当前页码
    var pageSize = parseInt(req.params.pageSize);// 每页条数

    var keyword = req.query.keyword;// 提交的关键字
    var query = {};// 搜索对象
    if(keyword) {// 如果关键字有值的话
        var reg = new RegExp(keyword,'i');// 创建一个正则表达式
        query = {// 查询对象
            $or:[// 只要有一个匹配就可以
                {title:reg},
                {content:reg}
            ]
        };
    }
    //var user = req.session.user;
    // populate表示填充  把user从id转成对象
    model.article.count(query,function (err,count) {
        model.article.find(query).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function (err,docs) {
            if(err) {
                res.render('index', { title: '首页',articles:[]});
            } else {
                docs.forEach(function (doc) {
                    doc.content = markdown.toHTML(doc.content);
                });
                res.render('index', {
                    title: '首页',
                    keyword:keyword,
                    pageNum:pageNum,
                    pageSize:pageSize,
                    totalPage:Math.ceil(count/pageSize),
                    articles:docs});
            }
        });
    })


});


// 获取增加文章的表单
router.get('/add',function (req,res) {
    res.render('article/add',{article:{}});
});
// 提交增加文章的表单
router.post('/add',function (req,res) {
    var article = req.body;// 标题，正文
    if(article._id) {// 如果提交的表单有id就表示更新
        model.article.update({_id:article._id},{
            $set:{
                title:article.title,
                content:article.content
            }
        },function (err,doc) {
            if(err) {
                res.flash('error',err.toString());
                res.redirect('back');
            } else {
                res.render('/',{article:doc});
                res.redirect('/article/detail/'+article._id);
            }
        })
    } else {
        article.user = req.session.user._id;
        model.article.create(article,function (err,doc) {
            if(err) {
                res.redirect('back');
            } else {
                res.redirect('/');
            }
        });
    }
});

router.get('/detail/:_id',function (req,res) {
    model.article.findById(req.params._id,function (err,doc) {
        if(err) {
            res.render('back');
        } else {
            doc.content = markdown.toHTML(doc.content);
            res.render('article/detail',{article:doc});
        }
    });

});

router.get('/delete/:_id',function (req,res) {
    model.article.remove({_id:req.params._id},function (err,doc) {
        if(err) {
            res.render('back');
        } else {
            res.redirect('/');
        }
    });
});


router.get('/edit/:_id',function (req,res) {
    model.article.findById(req.params._id,function (err,doc) {
        res.render('article/add',{article:doc})
    })
});

module.exports = router;