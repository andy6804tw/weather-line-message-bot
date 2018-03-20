'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _linebot = require('linebot');

var _linebot2 = _interopRequireDefault(_linebot);

var _message = require('../controllers/message.controller');

var _message2 = _interopRequireDefault(_message);

var _config = require('./../../config/config');

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