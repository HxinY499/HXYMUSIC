let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser')

let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');
let historyRouter = require('./routes/history');
let commentRouter = require('./routes/comment');
let likeRouter = require('./routes/like');
let dataRouter = require('./routes/data');
let playlistRouter = require('./routes/playlist');
let postRouter = require('./routes/post');
let searchRouter = require('./routes/search')

//连接数据库
require("./db/index")

let app = express();

//允许跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//请求静态资源
app.use("/static", express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//配置路由
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/history', historyRouter);
app.use('/comment', commentRouter);
app.use('/likes', likeRouter);
app.use('/data', dataRouter);
app.use('/playlist', playlistRouter);
app.use('/post', postRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    message: err.message,
    error: err
  });
});

module.exports = app;
