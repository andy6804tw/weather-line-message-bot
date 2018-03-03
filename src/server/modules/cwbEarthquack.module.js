import request from 'request';
import cheerio from 'cheerio';
import uploadImgur from '../lib/uploadImgur';

const getPageUrl = () => {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = cheerio.load(body); // 載入 body
      const tableTr = $('.BoxTable tr'); // 爬最外層的 Table(class=BoxTable) 中的 tr
      const tableTd = tableTr.eq(1).find('td'); // 擷取每個欄位(td)
      const pageUrl = tableTd.eq(7).text(); // 取得最近一次地震網頁
      resolve(pageUrl);
    });
  });
};
const getImage = (pageUrl) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://www.cwb.gov.tw/V7/earthquake/Data/local/${pageUrl}`, // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = cheerio.load(body); // 載入 body
      const tableTr = $('.BoxContentTab.clearfix img'); // 爬最外層的 Table(class=BoxTable) 中的 tr
      // 在終端機(console)列出結果
      const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/local/${tableTr.attr('src')}`;
      console.log(imgUrl);
      uploadImgur(imgUrl).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

export default {
  getPageUrl,
  getImage
};
