import request from 'request';
import cheerio from 'cheerio';
import uploadImgur from '../lib/uploadImgur';

const getImage = () => {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://www.cwb.gov.tw/V7/modules/Real_Image.htm', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        resolve('');
      }
      const $ = cheerio.load(body); // 載入 body
      const imgUrl = `https://www.cwb.gov.tw${$('img').attr('src')}`;
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
