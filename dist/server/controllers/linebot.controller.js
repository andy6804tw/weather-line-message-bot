'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const replyMessage = event => {
  if (event.message.type = 'text') {
    const msg = event.message.text;
    // 收到文字訊息時，直接把收到的訊息傳回去
    event.reply(msg).then(data => {
      // 傳送訊息成功時，可在此寫程式碼
      console.log(msg);
    }).catch(error => {
      // 傳送訊息失敗時，可在此寫程式碼
      console.log(`錯誤產生，錯誤碼：${error}`);
    });
  }
};
const test = (req, res) => {
  res.send('測試');
};

exports.default = { replyMessage, test };