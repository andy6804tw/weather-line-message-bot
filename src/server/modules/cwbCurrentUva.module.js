import request from 'request';
import cheerio from 'cheerio';
import uploadImgur from '../lib/uploadImgur';

// 取得紫外線圖(imgur網址)
const getImage = () => {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.cwb.gov.tw/V7/observe/', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      const $ = cheerio.load(body); // 載入 body
      const imgUva = `http://www.cwb.gov.tw/${$('.newpic01 img').eq(6).attr('src')}`; // 爬最外層的 Table(class=BoxTable) 中的 tr
      uploadImgur(imgUva).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  });
};

export default {
  getImage
};
