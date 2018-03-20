'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// imgur API 上傳圖片
const uploadImgur = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    try {
      const response = yield (0, _axios2.default)({
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
  });

  return function uploadImgur(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = uploadImgur;