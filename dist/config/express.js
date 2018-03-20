'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _AppError = require('../server/helpers/AppError');

var _AppError2 = _interopRequireDefault(_AppError);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _index = require('../server/routes/index.route');

var _index2 = _interopRequireDefault(_index);

var _linebot = require('linebot');

var _linebot2 = _interopRequireDefault(_linebot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

// parse body params and attache them to req.body
const parser = _bodyParser2.default.json({
  verify(req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding);
  }
});
app.use(parser);
// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());
// HTTP request logger middleware for node.js
app.use((0, _morgan2.default)('dev'));
// lint bot

// config
const bot = (0, _linebot2.default)({
  channelId: _config2.default.channelId,
  channelSecret: _config2.default.channelSecret,
  channelAccessToken: _config2.default.channelAccessToken
});
// const linebotParser = bot.parser();
// app.use(linebotParser);


/* GET home page. */
// app.get('/', (req, res) => {
//   res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
// });

app.use('/', _index2.default);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  console.log('1');
  let errorMessage;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof _expressValidation2.default.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorMessage = err.errors[0].messages;
      errorCode = 400;
      errorStatus = _httpStatus2.default.BAD_REQUEST;
    }
    const error = new _AppError2.default.APIError(errorMessage, errorStatus, true, errorCode);
    return next(error);
  }
  return next(err);
});

// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
  console.log('2');
  res.status(err.status).json({
    message: err.isPublic ? err.message : _httpStatus2.default[err.status],
    code: err.code ? err.code : _httpStatus2.default[err.status],
    stack: _config2.default.env === 'development' ? err.stack : {}
  });
  next();
});

exports.default = app;