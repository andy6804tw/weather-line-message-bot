import request from 'request';
import cheerio from 'cheerio';
import uploadImgur from '../lib/uploadImgur';

const getImage = () => {
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
      const numero = tableTd.eq(0).text(); // 取得編號
      const pageUrl = tableTd.eq(7).text().split('.')[0]; // 取得最近一次地震網頁
      // 判斷是否全台有感地震(quake)或區域地震(local)
      const queryString = !Number.isNaN(Number(numero)) ? `quake/${pageUrl}` : `local/${pageUrl}`;
      const imgUrl = `https://www.cwb.gov.tw/V7/earthquake/Data/${queryString}.gif`;
      uploadImgur(imgUrl).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

export default {
  getImage
};
