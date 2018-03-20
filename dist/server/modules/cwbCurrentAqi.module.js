'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _uploadImgur = require('../lib/uploadImgur');

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