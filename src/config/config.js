import Joi from 'joi';

// require and configure dotenv, will load vars in .env in process.env
require('dotenv').config();

const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: Joi.number().default(8080), // 數字且預設值為 8080
  CHANNEL_ID: Joi.number(), // 字串
  CHANNEL_SERECT: Joi.string(), // 字串
  CHANNEL_ACCESS_TOKEN: Joi.string(), // 字串
  VERSION: Joi.string() // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // API版本
  env: envVars.NODE_ENV, // 開發模式(development、production)
  port: envVars.PORT, // API 阜號
  channelId: envVars.CHANNEL_ID, // line bot channelId
  channelSecret: envVars.CHANNEL_SERECT, // line bot channelSecret
  channelAccessToken: envVars.CHANNEL_ACCESS_TOKEN, // line bot channelAccessToken
};

export default config; // 匯出共用
