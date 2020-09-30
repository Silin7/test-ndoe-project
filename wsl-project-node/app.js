var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);

//设置跨域访问
app.all('*', function (req, res, next) {
  if (req.method.toLowerCase() == 'options') {
    res.send(200);  //让options尝试请求快速结束
  }
  else {
    next();
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Content-Type", "application/json/text/html;charset=UTF-8");
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // 指定了该响应的资源是否被允许与给定的origin共享 跨域
  // res.header("Access-Control-Allow-Origin", "*");
  // // 明确了客户端所要访问的资源允许使用的方法或方法列表
  // res.header('Access-Control-Allow-Methods', '*');
  // // 告诉客户端实际返回的内容的内容类型
  // res.header("Access-Control-Allow-Headers", "Content-Type: application/json/text/html; charset=UTF-8, X-Requested-With, xCors, Origin, Accept");

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
