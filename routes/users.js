var express = require('express');
var router = express.Router();
var model = require('../model');
var ware = require('../ware');


/* GET users listing. 获取用户列表*/
router.get('/', ware.checkNotLogin,function(req, res) {
  res.send('respond with a resource');
});

// 获取注册表单
router.get('/reg',ware.checkNotLogin,function (req,res) {
  // 这是一个相对路径，相对于views目录
  res.render('user/reg',{});
});
// 提交注册表单
router.post('/reg',ware.checkNotLogin,function (req,res) {
  var user = req.body;
  console.log(user);
  // 如果说密码和重复密码不一致，则退回上一个页面
  if(user.password != user.repassword) {
    req.flash('error','密码不正确');
    return res.redirect('back');
  }
  // 删除不需要持久化的重复密码字段
  delete user.repassword;
  user.avatar = "http://s.gravatar.com/avatar/"+md5(user.email)+"?s=80";
  /*user.avatar = "https://secure.gravator.com/avatar/"+md5(user.email)+"?s=80";*/
  // 把它保存到数据库中
  model.user.create(user,function (err,doc) {
    if(err) {
      req.flash('error','注册失败，请重新填写');
      return res.redirect('back');
    } else {
      req.flash('success','恭喜你，注册成功！');
      req.session.user = doc;
      res.redirect('/');
    }
  });

});

function md5 (str) {
  return require('crypto').createHash('md5').update(str).digest('hex');
}

// 获取登录表单
router.get('/login',ware.checkNotLogin,function (req,res) {
  res.render('user/login',{});
});

router.post('/login',ware.checkNotLogin,function (req,res) {
  res.send('post login');
});


router.get('/logout',ware.checkNotLogin,function (req,res) {
  res.send('logout');
});


module.exports = router;
