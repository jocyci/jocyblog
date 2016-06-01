// ����expressģ��
var express = require('express');
// ������������·��  join reslove
var path = require('path');
// �����ղؼ�ͼ����м��
var favicon = require('serve-favicon');
// ��־��¼��
var logger = require('morgan');
// ����cookie��  req.cookies���� �����е�����ͷ�е�cookie�ֶ�
var cookieParser = require('cookie-parser');
// �������������� req.body
var bodyParser = require('body-parser');

// ��ҳ·�� ·���ļ�
var routes = require('./routes/index');
// �û�·��
var users = require('./routes/users');

var articles = require('./routes/article');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var flash = require('connect-flash');


// ����app
var app = express();

// view engine setup ����ģ��Ĵ��·��
app.set('views', path.join(__dirname, 'views'));
// ����ģ������
app.set('view engine', 'html');// =��Ⱦ���� -���԰�html��Ⱦ����

// ����html��ģ����ejs����Ⱦ
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));// �ղؼ�ͼ��������ļ�·��



// ʹ����־�м�� dev����ʱ��־��һ�ָ�ʽ
app.use(logger('dev'));
// ����������
app.use(bodyParser.json());//����application/json
app.use(bodyParser.urlencoded({ extended: false }));// ����application/x-www-form-urlencoded

// ����cookie ������ͷ�ص�cookieת�ɶ��� req.cookies
app.use(cookieParser());
app.use(session({
  secret:'jocy',// ����cookie����Կ
  resave:true,// ����S����
  saveUninitialized:true,// ����δ��ʼ����session
  store:new MongoStore({// ָ���Ự�����ݿ�洢λ��
    url:'mongodb://123.57.143.189:27017/jocyblog'
  })
}));

// ��̬�ļ��м��
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function (req,res,next) {
  // res.locals����ģ����Ⱦʱ�����õ�����Դ����
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});
// ������ҳ·�� ��·��
app.use('/', routes);
// �����û�·��  ��·��
app.use('/users', users);
app.use('/article', articles);


// catch 404 and forward to error handler ����404������ת��������м��
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// ������������������ӡ������ջ�쳣
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
// ���ɻ����еĴ��������ߺ�ģ�������Ҫ�Ѷ�ջ��Ϣй¶���û�
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
