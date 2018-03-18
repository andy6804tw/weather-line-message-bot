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
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


// imgur API 上傳圖片
const uploadImgur = async url => {
  try {
    const response = await __WEBPACK_IMPORTED_MODULE_0_axios___default()({
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

/* harmony default export */ __webpack_exports__["a"] = (uploadImgur);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_joi__);


// require and configure dotenv, will load vars in .env in process.env
__webpack_require__(10).config();

const envVarSchema = __WEBPACK_IMPORTED_MODULE_0_joi___default.a.object().keys({
  NODE_ENV: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.number().default(8080), // 數字且預設值為 8080
  CHANNEL_ID: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.number(), // 字串
  CHANNEL_SERECT: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string(), // 字串
  CHANNEL_ACCESS_TOKEN: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string(), // 字串
  VERSION: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string() // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = __WEBPACK_IMPORTED_MODULE_0_joi___default.a.validate(process.env, envVarSchema);

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

/* harmony default export */ __webpack_exports__["a"] = (config); // 匯出共用

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_express__ = __webpack_require__(11);




if (!module.parent) {
  // listen on port config.port
  __WEBPACK_IMPORTED_MODULE_1__config_express__["a" /* default */].listen(process.env.PORT || __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].port, () => {
    console.log(`server started on  port http://127.0.0.1:${__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].port} (${__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].env})`);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__config_express__["a" /* default */]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
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
		Object.defineProperty(module, "exports", {
			enumerable: true,
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_status__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_http_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_http_status__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_validation__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_validation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_validation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__server_helpers_AppError__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__server_routes_index_route__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_linebot__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_linebot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_linebot__);










const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

// parse body params and attache them to req.body
const parser = __WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json({
  verify(req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding);
  }
});
app.use(parser);
// enable CORS - Cross Origin Resource Sharing
app.use(__WEBPACK_IMPORTED_MODULE_2_cors___default()());
// HTTP request logger middleware for node.js
app.use(__WEBPACK_IMPORTED_MODULE_3_morgan___default()('dev'));
// lint bot

// config
const bot = __WEBPACK_IMPORTED_MODULE_9_linebot___default()({
  channelId: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].channelId,
  channelSecret: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].channelSecret,
  channelAccessToken: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].channelAccessToken
});
// const linebotParser = bot.parser();
// app.use(linebotParser);


/* GET home page. */
// app.get('/', (req, res) => {
//   res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
// });

app.use('/', __WEBPACK_IMPORTED_MODULE_8__server_routes_index_route__["a" /* default */]);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  console.log('1');
  let errorMessage;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof __WEBPACK_IMPORTED_MODULE_5_express_validation___default.a.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorMessage = err.errors[0].messages;
      errorCode = 400;
      errorStatus = __WEBPACK_IMPORTED_MODULE_4_http_status___default.a.BAD_REQUEST;
    }
    const error = new __WEBPACK_IMPORTED_MODULE_6__server_helpers_AppError__["a" /* default */].APIError(errorMessage, errorStatus, true, errorCode);
    return next(error);
  }
  return next(err);
});

// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
  console.log('2');
  res.status(err.status).json({
    message: err.isPublic ? err.message : __WEBPACK_IMPORTED_MODULE_4_http_status___default.a[err.status],
    code: err.code ? err.code : __WEBPACK_IMPORTED_MODULE_4_http_status___default.a[err.status],
    stack: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].env === 'development' ? err.stack : {}
  });
  next();
});

/* harmony default export */ __webpack_exports__["a"] = (app);

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http_status__);


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
  constructor(message, status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.INTERNAL_SERVER_ERROR, isPublic = false, code) {
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
  constructor(message = 'Backend Error', status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.INTERNAL_SERVER_ERROR, isPublic = true, code = 500) {
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
  constructor(message = '信箱尚未註冊！', status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.UNAUTHORIZED, isPublic = true, code = 401) {
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
  constructor(message = '您輸入的密碼有誤！', status = __WEBPACK_IMPORTED_MODULE_0_http_status___default.a.UNAUTHORIZED, isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'LoginError';
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  APIError,
  MySQLError,
  LoginError1,
  LoginError2
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linebot_route__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_config__ = __webpack_require__(4);




const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${__WEBPACK_IMPORTED_MODULE_2__config_config__["a" /* default */].port}/api`);
});
/** linebot Router */
router.use('/webhook', __WEBPACK_IMPORTED_MODULE_1__linebot_route__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linebot__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_linebot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_linebot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_message_controller__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(4);





// config
const bot = __WEBPACK_IMPORTED_MODULE_1_linebot___default()({
  channelId: __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* default */].channelId,
  channelSecret: __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* default */].channelSecret,
  channelAccessToken: __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* default */].channelAccessToken
});
const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

/* Webhook linebot POST */
router.use(bot.parser());

// reply text message
bot.on('message', __WEBPACK_IMPORTED_MODULE_2__controllers_message_controller__["a" /* default */].replyMessage);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_cwbWeatherHelper_module__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_cwbEarthquack_module__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_cwbCurrentWeather_module__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_cwbCurrentUva_module__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_cwbCurrentAqi_module__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_uploadImgur__ = __webpack_require__(2);









const replyMessage = event => {
  if (event.message.type === 'text') {
    if (event.message.text.indexOf('概況') > -1) {
      /* 平行化序列
       * 同時取得縣市概況描述(message)+紅外線雲圖(image)並同時回傳圖片和文字訊息
       * 若 imgur 圖片上傳失敗回傳原始圖片網址
       * Tip:要求使用者輸入[縣市+概況]中間可以有空白
       * */

      // 取得縣市名稱 ex: 臺北市概況 => 臺北市
      const city = event.message.text.split('概況')[0].trim();
      __WEBPACK_IMPORTED_MODULE_0_async___default.a.parallel({
        message(callback) {
          __WEBPACK_IMPORTED_MODULE_1__modules_cwbWeatherHelper_module__["a" /* default */].getWeatherMessage(city).then(res => {
            callback(null, res);
          });
        },
        image(callback) {
          // 取得紅外線雲圖
          __WEBPACK_IMPORTED_MODULE_1__modules_cwbWeatherHelper_module__["a" /* default */].getInfraredCloudMap().then(resUrl => {
            Object(__WEBPACK_IMPORTED_MODULE_6__lib_uploadImgur__["a" /* default */])(resUrl).then(res => {
              callback(null, res);
            });
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
      __WEBPACK_IMPORTED_MODULE_2__modules_cwbEarthquack_module__["a" /* default */].getImage().then(result => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({ type: 'image', originalContentUrl: result.url, previewImageUrl: result.url });
        }
      });
    } else if (event.message.text.indexOf('目前天氣') > -1) {
      __WEBPACK_IMPORTED_MODULE_3__modules_cwbCurrentWeather_module__["a" /* default */].getImage().then(result => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({ type: 'image', originalContentUrl: result.url, previewImageUrl: result.url });
        }
      });
    } else if (event.message.text.indexOf('紫外線') > -1) {
      __WEBPACK_IMPORTED_MODULE_4__modules_cwbCurrentUva_module__["a" /* default */].getImage().then(result => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({ type: 'image', originalContentUrl: result.url, previewImageUrl: result.url });
        }
      });
    } else if (event.message.text.indexOf('空氣品質') > -1) {
      __WEBPACK_IMPORTED_MODULE_0_async___default.a.parallel({
        image(callback) {
          // 取得全台空氣品質圖
          __WEBPACK_IMPORTED_MODULE_5__modules_cwbCurrentAqi_module__["a" /* default */].getImage().then(resUrl => {
            callback(null, resUrl);
          });
        },
        message(callback) {
          // 取得空氣品質訊息
          __WEBPACK_IMPORTED_MODULE_5__modules_cwbCurrentAqi_module__["a" /* default */].getAqiMessage().then(res => {
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
      \n【快速按鈕使用】\n- 全臺概況(圖)\n- 全臺概況(圖)\n- 目前天氣(圖)\n- 空氣品質(圖)\n- 紫外線(圖)\n- 地震(圖)
      \n【進階指令】\n1. 縣市概況：\n在對話框輸入(台灣的縣市+概況)即可查詢一日天氣狀況描述與即時紅外線雲圖。\n例如：臺南市概況、臺中市概況
      `;
      event.reply({ type: 'text', text: message });
    }
  }
};
const test = (req, res) => {
  res.send('測試');
};

/* harmony default export */ __webpack_exports__["a"] = ({
  replyMessage,
  test
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);



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
  console.log(cityToken);
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_request___default()({
      url: `http://www.cwb.gov.tw/V7/forecast/taiwan/Data/${cityToken}.txt`, // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(body); // 載入 body
      // 回傳結果
      resolve($.text());
    });
  });
};

// 紅外線雲圖
const getInfraredCloudMap = () => {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_request___default()({
      url: 'http://www.cwb.gov.tw/V7/observe/', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(body); // 載入 body
      const imgRainFall = `http://www.cwb.gov.tw/${$('.newpic01 img').eq(2).attr('src')}`; // 爬最外層的 Table(class=BoxTable) 中的 tr
      resolve(imgRainFall);
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getCityToken,
  getWeatherMessage,
  getInfraredCloudMap
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__ = __webpack_require__(2);




// const getPageUrl = () => {
//   return new Promise((resolve, reject) => {
//     request({
//       url: 'http://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm', // 中央氣象局網頁
//       method: 'GET'
//     }, (error, response, body) => {
//       if (error || !body) {
//         return;
//       }
//       const $ = cheerio.load(body); // 載入 body
//       const tableTr = $('.BoxTable tr'); // 爬最外層的 Table(class=BoxTable) 中的 tr
//       const tableTd = tableTr.eq(1).find('td'); // 擷取每個欄位(td)
//       const numero = tableTd.eq(0).text(); // 取得編號
//       const pageUrl = tableTd.eq(7).text().split('.')[0]; // 取得最近一次地震網頁
//       const result = Object.assign({ numero, pageUrl });
//       resolve(result);
//     });
//   });
// };
// const getImages = (pageResult) => {
//   // 判斷是否全台有感地震(quake)或區域地震(local)
//   const queryString = !Number.isNaN(pageResult.numero) ? `quake/${pageResult.pageUrl}` : `local/${pageResult.pageUrl}`;
//   console.log(queryString);
//   return new Promise((resolve, reject) => {
//     const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}.gif`;
//     console.log(imgUrl);
//     uploadImgur(imgUrl).then((res) => {
//       console.log(res);
//       resolve(res);
//     });
//     // request({
//     //   url: `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}`, // 中央氣象局網頁
//     //   method: 'GET'
//     // }, (error, response, body) => {
//     //   if (error || !body) {
//     //     return;
//     //   }
//     //   const $ = cheerio.load(body); // 載入 body
//     //   const tableTr = $('.BoxContentTab.clearfix img'); // 爬最外層的 Table(class=BoxTable) 中的 tr
//     //   // 在終端機(console)列出結果
//     //   const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/local/${tableTr.attr('src')}`;
//     //   console.log(imgUrl);
//     //   uploadImgur(imgUrl).then((res) => {
//     //     console.log(res);
//     //     resolve(res);
//     //   });
//     // });
//   });
// };
const getImage = () => {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_request___default()({
      url: 'http://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(body); // 載入 body
      const tableTr = $('.BoxTable tr'); // 爬最外層的 Table(class=BoxTable) 中的 tr
      const tableTd = tableTr.eq(1).find('td'); // 擷取每個欄位(td)
      const numero = tableTd.eq(0).text(); // 取得編號
      const pageUrl = tableTd.eq(7).text().split('.')[0]; // 取得最近一次地震網頁
      // 判斷是否全台有感地震(quake)或區域地震(local)
      const queryString = !Number.isNaN(Number(numero)) ? `quake/${pageUrl}` : `local/${pageUrl}`;
      console.log(queryString);
      const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}.gif`;
      console.log(imgUrl);
      Object(__WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__["a" /* default */])(imgUrl).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getImage
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__ = __webpack_require__(2);




const getImage = () => {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_request___default()({
      url: 'https://www.cwb.gov.tw/V7/modules/Real_Image.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(body); // 載入 body
      const imgUrl = `https://www.cwb.gov.tw${$('img').attr('src')}`;
      // 在終端機(console)列出結果
      console.log(imgUrl);
      Object(__WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__["a" /* default */])(imgUrl).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getImage
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__ = __webpack_require__(2);




// 取得紫外線圖(imgur網址)
const getImage = () => {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_request___default()({
      url: 'http://www.cwb.gov.tw/V7/observe/', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(body); // 載入 body
      const imgUva = `http://www.cwb.gov.tw/${$('.newpic01 img').eq(6).attr('src')}`; // 爬最外層的 Table(class=BoxTable) 中的 tr
      Object(__WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__["a" /* default */])(imgUva).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getImage
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__ = __webpack_require__(2);




const getAqiMessage = () => {
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_0_request___default()({
      url: 'https://taqm.epa.gov.tw/taqm/aqs.ashx?act=MaintainLine&lang=tw', // 中央氣象空品訊息
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = __WEBPACK_IMPORTED_MODULE_1_cheerio___default.a.load(body); // 載入 body
      // 回傳結果
      resolve($.text());
    });
  });
};
// 取得全台空氣品質圖(imgur網址)
const getImage = () => {
  return new Promise((resolve, reject) => {
    const imgAqi = 'https://taqm.epa.gov.tw/taqm/chart/Pollutant/map.aspx?param=33&hour=0&noarea=true';
    Object(__WEBPACK_IMPORTED_MODULE_2__lib_uploadImgur__["a" /* default */])(imgAqi).then(res => {
      console.log(res);
      resolve(res);
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getAqiMessage,
  getImage
});

/***/ })
/******/ ]);