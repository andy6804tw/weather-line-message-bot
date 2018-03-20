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

// 取得紫外線圖(imgur網址)
const getImage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'http://www.cwb.gov.tw/V7/observe/', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      const imgUva = `http://www.cwb.gov.tw/${$('.newpic01 img').eq(6).attr('src')}`; // 爬最外層的 Table(class=BoxTable) 中的 tr
      (0, _uploadImgur2.default)(imgUva).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

exports.default = {
  getImage
};