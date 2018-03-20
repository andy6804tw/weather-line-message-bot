'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const http = require('http');

if (!module.parent) {
  // listen on port config.port
  http.createServer(_express2.default).listen(process.env.PORT || _config2.default.port, () => {
    console.log(`server started on  port http://127.0.0.1:${_config2.default.port} (${_config2.default.env})`);
  });
}

exports.default = _express2.default;