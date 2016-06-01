#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
// 加载一个自定义的日志记录器
var debug = require('debug')('jocyblog:server');
var http = require('http');

/**
 * Get port from environment and store in Express.从环境变量中得到端口号并且存储到express中
 */

var port = normalizePort(process.env.PORT || '3000');
// 把key-value保存在express应用中；可以用app.get('port')获取到
app.set('port', port);

/**
 * Create HTTP server.创建http服务器
 */

var server = http.createServer(app);// app是个回调监听函数

/**
 * Listen on provided port, on all network interfaces.在提供的端口上进行监听；
 */

// 启动服务
server.listen(port);
// 监听错误事件
server.on('error', onError);
// 当启动成功之后执行回调
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    // Error Access 没有访问权限
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':// 端口被占用
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
