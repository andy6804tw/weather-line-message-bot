'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _cwbWeatherHelper = require('../modules/cwbWeatherHelper.module');

var _cwbWeatherHelper2 = _interopRequireDefault(_cwbWeatherHelper);

var _cwbCurrentWeather = require('../modules/cwbCurrentWeather.module');

var _cwbCurrentWeather2 = _interopRequireDefault(_cwbCurrentWeather);

var _cwbCurrentAqi = require('../modules/cwbCurrentAqi.module');

var _cwbCurrentAqi2 = _interopRequireDefault(_cwbCurrentAqi);

var _cwbCurrentUva = require('../modules/cwbCurrentUva.module');

var _cwbCurrentUva2 = _interopRequireDefault(_cwbCurrentUva);

var _cwbEarthquack = require('../modules/cwbEarthquack.module');

var _cwbEarthquack2 = _interopRequireDefault(_cwbEarthquack);

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
        if (!results.message) {
          event.reply({ type: 'image', originalContentUrl: results.image.url, previewImageUrl: results.image.url });
        } else if (!results.image.success) {
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