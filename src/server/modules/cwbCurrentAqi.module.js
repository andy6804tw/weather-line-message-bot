import request from 'request';
import cheerio from 'cheerio';
import uploadImgur from '../lib/uploadImgur';

const getAqiMessage = () => {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://taqm.epa.gov.tw/taqm/aqs.ashx?act=MaintainLine&lang=tw', // 中央氣象空品訊息
      method: 'GET'
    }, (error, response, body) => {
      const $ = cheerio.load(body); // 載入 body
      // 回傳結果
      // if ($.text() == null) {
      //   resolve('');
      // } else {
      //   resolve($.text());
      // }
      resolve($.text());
    });
  });
};
// 取得全台空氣品質圖(imgur網址)
const getImage = () => {
  return new Promise((resolve, reject) => {
    const imgAqi = 'https://taqm.epa.gov.tw/taqm/chart/Pollutant/map.aspx?param=33&hour=0&noarea=true';
    uploadImgur(imgAqi).then((res) => {
      console.log(res);
      resolve(res);
    });
  });
};

export default {
  getAqiMessage,
  getImage
};
