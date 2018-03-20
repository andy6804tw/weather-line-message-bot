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

// const getPageUrl = () => {
//   return new Promise((resolve, reject) => {
//     request({
//       url: 'http://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm', // 中央氣象局網頁
//       method: 'GET'
//     }, (error, response, body) => {
//       if (error || !body) {
//         return;
//       }
//       const $ = cheerio.load(body); // 載入 body
//       const tableTr = $('.BoxTable tr'); // 爬最外層的 Table(class=BoxTable) 中的 tr
//       const tableTd = tableTr.eq(1).find('td'); // 擷取每個欄位(td)
//       const numero = tableTd.eq(0).text(); // 取得編號
//       const pageUrl = tableTd.eq(7).text().split('.')[0]; // 取得最近一次地震網頁
//       const result = Object.assign({ numero, pageUrl });
//       resolve(result);
//     });
//   });
// };
// const getImages = (pageResult) => {
//   // 判斷是否全台有感地震(quake)或區域地震(local)
//   const queryString = !Number.isNaN(pageResult.numero) ? `quake/${pageResult.pageUrl}` : `local/${pageResult.pageUrl}`;
//   console.log(queryString);
//   return new Promise((resolve, reject) => {
//     const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}.gif`;
//     console.log(imgUrl);
//     uploadImgur(imgUrl).then((res) => {
//       console.log(res);
//       resolve(res);
//     });
//     // request({
//     //   url: `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}`, // 中央氣象局網頁
//     //   method: 'GET'
//     // }, (error, response, body) => {
//     //   if (error || !body) {
//     //     return;
//     //   }
//     //   const $ = cheerio.load(body); // 載入 body
//     //   const tableTr = $('.BoxContentTab.clearfix img'); // 爬最外層的 Table(class=BoxTable) 中的 tr
//     //   // 在終端機(console)列出結果
//     //   const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/local/${tableTr.attr('src')}`;
//     //   console.log(imgUrl);
//     //   uploadImgur(imgUrl).then((res) => {
//     //     console.log(res);
//     //     resolve(res);
//     //   });
//     // });
//   });
// };
const getImage = () => {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: 'http://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = _cheerio2.default.load(body); // 載入 body
      const tableTr = $('.BoxTable tr'); // 爬最外層的 Table(class=BoxTable) 中的 tr
      const tableTd = tableTr.eq(1).find('td'); // 擷取每個欄位(td)
      const numero = tableTd.eq(0).text(); // 取得編號
      const pageUrl = tableTd.eq(7).text().split('.')[0]; // 取得最近一次地震網頁
      // 判斷是否全台有感地震(quake)或區域地震(local)
      const queryString = !Number.isNaN(Number(numero)) ? `quake/${pageUrl}` : `local/${pageUrl}`;
      console.log(queryString);
      const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}.gif`;
      console.log(imgUrl);
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