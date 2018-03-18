import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import APPError from '../server/helpers/AppError';
import config from './config';
import index from '../server/routes/index.route';


const app = express();

// parse body params and attache them to req.body
const parser = bodyParser.json({
  verify (req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding);
  }
});
app.use(parser);
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// HTTP request logger middleware for node.js
app.use(morgan('dev'));
// lint bot
import linebot from 'linebot';
// config
const bot = linebot({
  channelId: config.channelId,
  channelSecret: config.channelSecret,
  channelAccessToken: config.channelAccessToken
});
// const linebotParser = bot.parser();
// app.use(linebotParser);


/* GET home page. */
// app.get('/', (req, res) => {
//   res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
// });

app.use('/', index);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  console.log('1');
  let errorMessage;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof expressValidation.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorMessage = err.errors[0].messages;
      errorCode = 400;
      errorStatus = httpStatus.BAD_REQUEST;
    }
    const error = new APPError.APIError(errorMessage, errorStatus, true, errorCode);
    return next(error);
  }
  return next(err);
});

// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
  console.log('2');
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    code: err.code ? err.code : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  });
  next();
});

export default app;
