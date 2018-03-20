module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(22);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imgur API 上傳圖片
const uploadImgur = async url => {
  try {
    const response = await (0, _axios2.default)({
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      data: {
        image: url
      },
      headers: {
        authorization: 'Client-ID bc736c3f2e36e86'
      }
    });
    const result = Object.assign({ success: true, url: response.data.data.link });
    return result;
  } catch (error) {
    // 圖片上傳失敗，回傳原始圖片網址
    const result = Object.assign({ success: false, url });
    return result;
  }
};

exports.default = uploadImgur;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in process.env
__webpack_require__(10).config();

const envVarSchema = _joi2.default.object().keys({
  NODE_ENV: _joi2.default.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: _joi2.default.number().default(8080), // 數字且預設值為 8080
  CHANNEL_ID: _joi2.default.number(), // 字串
  CHANNEL_SERECT: _joi2.default.string(), // 字串
  CHANNEL_ACCESS_TOKEN: _joi2.default.string(), // 字串
  VERSION: _joi2.default.string() // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = _joi2.default.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // API版本
  env: envVars.NODE_ENV, // 開發模式(development、production)
  port: envVars.PORT, // API 阜號
  channelId: envVars.CHANNEL_ID, // line bot channelId
  channelSecret: envVars.CHANNEL_SERECT, // line bot channelSecret
  channelAccessToken: envVars.CHANNEL_ACCESS_TOKEN // line bot channelAccessToken
};

exports.default = config; // 匯出共用

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("linebot");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _express = __webpack_require__(11);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const http = __webpack_require__(27);

if (!module.parent) {
  // listen on port config.port
  http.createServer(_express2.default).listen(process.env.PORT || _config2.default.port, () => {
    console.log(`server started on  port http://127.0.0.1:${_config2.default.port} (${_config2.default.env})`);
  });
}

exports.default = _express2.default;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(12);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = __webpack_require__(13);

var _cors2 = _interopRequireDefault(_cors);

var _morgan = __webpack_require__(14);

var _morgan2 = _interopRequireDefault(_morgan);

var _httpStatus = __webpack_require__(5);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _expressValidation = __webpack_require__(15);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _AppError = __webpack_require__(16);

var _AppError2 = _interopRequireDefault(_AppError);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _index = __webpack_require__(17);

var _index2 = _interopRequireDefault(_index);

var _linebot = __webpack_require__(6);

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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpStatus = __webpack_require__(5);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, status = _httpStatus2.default.INTERNAL_SERVER_ERROR, isPublic = false, code) {
    super(message, status, isPublic, code);
    this.name = 'APIError';
  }
}

/**
 * Class representing an MySQL error.
 * @extends ExtendableError
 */
class MySQLError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = 'Backend Error', status = _httpStatus2.default.INTERNAL_SERVER_ERROR, isPublic = true, code = 500) {
    super(message, status, isPublic, code);
    this.name = 'MySQLError';
  }
}

/**
 * 信箱尚未註冊 Error
 * @extends ExtendableError
 */
class LoginError1 extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = '信箱尚未註冊！', status = _httpStatus2.default.UNAUTHORIZED, isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}
/**
 * 密碼錯誤 Error.
 * @extends ExtendableError
 */
class LoginError2 extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = '您輸入的密碼有誤！', status = _httpStatus2.default.UNAUTHORIZED, isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

exports.default = {
  APIError,
  MySQLError,
  LoginError1,
  LoginError2
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _linebot = __webpack_require__(18);

var _linebot2 = _interopRequireDefault(_linebot);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${_config2.default.port}/api`);
});
/** linebot Router */
router.use('/webhook', _linebot2.default);

exports.default = router;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _linebot = __webpack_require__(6);

var _linebot2 = _interopRequireDefault(_linebot);

var _message = __webpack_require__(19);

var _message2 = _interopRequireDefault(_message);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config
const bot = (0, _linebot2.default)({
  channelId: _config2.default.channelId,
  channelSecret: _config2.default.channelSecret,
  channelAccessToken: _config2.default.channelAccessToken
});
const router = _express2.default.Router();

/* Webhook linebot POST */
router.use(bot.parser());

// reply text message
bot.on('message', _message2.default.replyMessage);

exports.default = router;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _async = __webpack_require__(20);

var _async2 = _interopRequireDefault(_async);

var _cwbWeatherHelper = __webpack_require__(21);

var _cwbWeatherHelper2 = _interopRequireDefault(_cwbWeatherHelper);

var _cwbEarthquack = __webpack_require__(23);

var _cwbEarthquack2 = _interopRequireDefault(_cwbEarthquack);

var _cwbCurrentWeather = __webpack_require__(24);

var _cwbCurrentWeather2 = _interopRequireDefault(_cwbCurrentWeather);

var _cwbCurrentUva = __webpack_require__(25);

var _cwbCurrentUva2 = _interopRequireDefault(_cwbCurrentUva);

var _cwbCurrentAqi = __webpack_require__(26);

var _cwbCurrentAqi2 = _interopRequireDefault(_cwbCurrentAqi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const replyMessage = event => {
  if (event.message.type === 'text') {
    console.log(event.message.text);
    if (event.message.text.indexOf('概況') > -1) {
      /* 平行化序列
       * 同時取得縣市概況描述(message)+紅外線雲圖(image)並同時回傳圖片和文字訊息
       * 若 imgur 圖片上傳失敗回傳原始圖片網址
       * Tip:要求使用者輸入[縣市+概況]中間可以有空白
       * */

      // 取得縣市名稱 ex: 臺北市概況 => 臺北市
      const city = event.message.text.split('概況')[0].trim();
      _async2.default.parallel({
        message(callback) {
          _cwbWeatherHelper2.default.getWeatherMessage(city).then(resd => {
            callback(null, resd);
          });
        },
        image(callback) {
          // 取得紅外線雲圖
          _cwbWeatherHelper2.default.getImage().then(result => {
            callback(null, result);
          });
        }
      }, (err, results) => {
        if (!results.image.success) {
          event.reply([{
            type: 'text', text: results.image.url
          }, { type: 'text', text: results.message }]);
        } else {
          event.reply([{
            type: 'image',
            originalContentUrl: results.image.url,
            previewImageUrl: results.image.url
          }, { type: 'text', text: results.message }]);
        }
      });
    } else if (event.message.text.indexOf('地震') > -1) {
      _cwbEarthquack2.default.getImage().then(result => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({ type: 'image', originalContentUrl: result.url, previewImageUrl: result.url });
        }
      });
    } else if (event.message.text.indexOf('目前天氣') > -1) {
      _cwbCurrentWeather2.default.getImage().then(result => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({ type: 'image', originalContentUrl: result.url, previewImageUrl: result.url });
        }
      });
    } else if (event.message.text.indexOf('紫外線') > -1) {
      _cwbCurrentUva2.default.getImage().then(result => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({ type: 'image', originalContentUrl: result.url, previewImageUrl: result.url });
        }
      });
    } else if (event.message.text.indexOf('空氣品質') > -1) {
      _async2.default.parallel({
        image(callback) {
          // 取得全台空氣品質圖
          _cwbCurrentAqi2.default.getImage().then(resUrl => {
            callback(null, resUrl);
          });
        },
        message(callback) {
          // 取得空氣品質訊息
          _cwbCurrentAqi2.default.getAqiMessage().then(res => {
            callback(null, res);
          });
        }
      }, (err, results) => {
        if (!results.image.success) {
          event.reply([{
            type: 'text', text: results.image.url
          }, { type: 'text', text: results.message }]);
        } else {
          event.reply([{
            type: 'image',
            originalContentUrl: results.image.url,
            previewImageUrl: results.image.url
          }, { type: 'text', text: results.message }]);
        }
      });
    } else {
      const message = `哈囉您好！歡迎使用天氣小幫手☀ ☁ ☂，目前支援指令，以及其說明：
      \n【快速按鈕使用】\n- 全臺概況(圖)\n- 目前天氣(圖)\n- 空氣品質(圖)\n- 紫外線(圖)\n- 地震(圖)
      \n【進階指令】\n1. 縣市概況：\n在對話框輸入(台灣的縣市+概況)即可查詢一日天氣狀況描述與即時紅外線雲圖。\n例如：臺南市概況、臺中市概況
      `;
      event.reply({ type: 'text', text: message });
    }
  }
};
const test = (req, res) => {
  res.send('測試');
};

exports.default = {
  replyMessage,
  test
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(1);

var _request2 = _interopRequireDefault(_request);

var _cheerio = __webpack_require__(2);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _uploadImgur = __webpack_require__(0);

var _uploadImgur2 = _interopRequireDefault(_uploadImgur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 取得縣市 Token
const getCityToken = city => {
  switch (city) {
    case '全臺':
      return 'W50';
    case '臺北市':
      return 'W50_63';
    case '新北市':
      return 'W50_65';
    case '桃園市':
      return 'W50_68';
    case '臺中市':
      return 'W50_66';
    case '臺南市':
      return 'W50_67';
    case '高雄市':
      return 'W50_64';
    case '基隆市':
      return 'W50_10017';
    case '新竹縣':
      return 'W50_10004';
    case '新竹市':
      return 'W50_10018';
    case '苗栗縣':
      return 'W50_10005';
    case '彰化縣':
      return 'W50_10007';
    case '南投縣':
      return 'W50_10008';
    case '雲林縣':
      return 'W50_10009';
    case '嘉義縣':
      return 'W50_10010';
    case '嘉義市':
      return 'W50_10020';
    case '屏東縣':
      return 'W50_10013';
    case '宜蘭縣':
      return 'W50_10002';
    case '花蓮縣':
      return 'W50_10015';
    case '臺東縣':
      return 'W50_10014';
    case '澎湖縣':
      return 'W50_10016';
    case '金門縣':
      return 'W50_09020';
    case '連江縣':
      return 'W50_09007';
    default:
      return '';
  }
};

// 天氣小幫手
const getWeatherMessage = city => {
  const cityToken = getCityToken(city);
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: `http://www.cwb.gov.tw/V7/forecast/taiwan/Data/${cityToken}.txt`, // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        reject(error);
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      // 回傳結果
      resolve($.text());
    });
  });
};

// 紅外線雲圖
const getImage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'http://www.cwb.gov.tw/V7/observe/', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      const imgRainFall = `http://www.cwb.gov.tw/${$('.newpic01 img').eq(2).attr('src')}`; // 爬最外層的 Table(class=BoxTable) 中的 tr
      (0, _uploadImgur2.default)(imgRainFall).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

exports.default = {
  getCityToken,
  getWeatherMessage,
  getImage
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(1);

var _request2 = _interopRequireDefault(_request);

var _cheerio = __webpack_require__(2);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _uploadImgur = __webpack_require__(0);

var _uploadImgur2 = _interopRequireDefault(_uploadImgur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getImage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'http://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      const tableTr = $('.BoxTable tr'); // 爬最外層的 Table(class=BoxTable) 中的 tr
      const tableTd = tableTr.eq(1).find('td'); // 擷取每個欄位(td)
      const numero = tableTd.eq(0).text(); // 取得編號
      const pageUrl = tableTd.eq(7).text().split('.')[0]; // 取得最近一次地震網頁
      // 判斷是否全台有感地震(quake)或區域地震(local)
      const queryString = !Number.isNaN(Number(numero)) ? `quake/${pageUrl}` : `local/${pageUrl}`;
      const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}.gif`;
      (0, _uploadImgur2.default)(imgUrl).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

exports.default = {
  getImage
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(1);

var _request2 = _interopRequireDefault(_request);

var _cheerio = __webpack_require__(2);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _uploadImgur = __webpack_require__(0);

var _uploadImgur2 = _interopRequireDefault(_uploadImgur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getImage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'https://www.cwb.gov.tw/V7/modules/Real_Image.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      const imgUrl = `https://www.cwb.gov.tw${$('img').attr('src')}`;
      (0, _uploadImgur2.default)(imgUrl).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

exports.default = {
  getImage
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(1);

var _request2 = _interopRequireDefault(_request);

var _cheerio = __webpack_require__(2);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _uploadImgur = __webpack_require__(0);

var _uploadImgur2 = _interopRequireDefault(_uploadImgur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 取得紫外線圖(imgur網址)
const getImage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'http://www.cwb.gov.tw/V7/observe/', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      const imgUva = `http://www.cwb.gov.tw/${$('.newpic01 img').eq(6).attr('src')}`; // 爬最外層的 Table(class=BoxTable) 中的 tr
      (0, _uploadImgur2.default)(imgUva).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

exports.default = {
  getImage
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = __webpack_require__(1);

var _request2 = _interopRequireDefault(_request);

var _cheerio = __webpack_require__(2);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _uploadImgur = __webpack_require__(0);

var _uploadImgur2 = _interopRequireDefault(_uploadImgur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAqiMessage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'https://taqm.epa.gov.tw/taqm/aqs.ashx?act=MaintainLine&lang=tw', // 中央氣象空品訊息
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      // 回傳結果
      resolve($.text());
    });
  });
};
// 取得全台空氣品質圖(imgur網址)
const getImage = () => {
  return new Promise((resolve, reject) => {
    const imgAqi = 'https://taqm.epa.gov.tw/taqm/chart/Pollutant/map.aspx?param=33&hour=0&noarea=true';
    (0, _uploadImgur2.default)(imgAqi).then(res => {
      console.log(res);
      resolve(res);
    });
  });
};

exports.default = {
  getAqiMessage,
  getImage
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ]);