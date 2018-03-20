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

const getImage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'https://www.cwb.gov.tw/V7/modules/Real_Image.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        resolve('');
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      const imgUrl = `https://www.cwb.gov.tw${$('img').attr('src')}`;
      (0, _uploadImgur2.default)(imgUrl).then(res => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

exports.default = {
  getImage
};