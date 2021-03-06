// 引入express模块
var express = require('express');
// 引入用来处理路径  join reslove
var path = require('path');
// 处理收藏夹图标的中间件
var favicon = require('serve-favicon');
// 日志记录器
var logger = require('morgan');
// 处理cookie的  req.cookies属性 请求中的请求头中的cookie字段
var cookieParser = require('cookie-parser');
// 用来处理请求体 req.body
var bodyParser = require('body-parser');

// 首页路由 路由文件
var routes = require('./routes/index');
// 用户路由
var users = require('./routes/users');

var articles = require('./routes/article');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var flash = require('connect-flash');


// 生成app
var app = express();

// view engine setup 设置模板的存放路径
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎
app.set('view engine', 'html');// =渲染变量 -可以把html渲染出来

// 设置html的模板由ejs来渲染
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));// 收藏夹图标的物理文件路径



// 使用日志中间件 dev开发时日志的一种格式
app.use(logger('dev'));
// 处理请求体
app.use(bodyParser.json());//处理application/json
app.use(bodyParser.urlencoded({ extended: false }));// 处理application/x-www-form-urlencoded

// 解析cookie 把请求头重的cookie转成对象 req.cookies
app.use(cookieParser());
app.use(session({
  secret:'jocy',// 加密cookie的密钥
  resave:true,// 重新S保存
  saveUninitialized:true,// 保存未初始化的session
  store:new MongoStore({// 指定会话的数据库存储位置
    url:'mongodb://123.57.143.189:27017/jocyblog'
    //url:'mongodb://localhost:27017/jocyblog'
  })
}));

// 静态文件中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function (req,res,next) {
  // res.locals它是模板渲染时真正用的数据源对象
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();

  // 关键字在首页顶部模板中需要用到，所以必须要在中间件中赋值
  res.locals.keyword = '';
  res.locals.pageNum = 1;
  res.locals.pageSize = 2;
  next();
});
// 配置首页路由 父路径
app.use('/', routes);
// 配置用户路由  子路径
app.use('/users', users);
app.use('/article', articles);


// catch 404 and forward to error handler 捕获404错误并且转向错误处理中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// 开发错误处理器，将打印出来堆栈异常
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// 生成环境中的错误处理（上线后的），不需要把堆栈信息泄露给用户
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
