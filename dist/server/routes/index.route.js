'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _linebot = require('./linebot.route');

var _linebot2 = _interopRequireDefault(_linebot);

var _config = require('./../../config/config');

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