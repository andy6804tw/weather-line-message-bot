'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in process.env
require('dotenv').config();

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