import request from 'request';
import cheerio from 'cheerio';

// 天氣小幫手
const getWeatherMessage = () => {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.cwb.gov.tw/V7/forecast/taiwan/Data/W50_63.txt', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = cheerio.load(body); // 載入 body

      // 在終端機(console)列出結果
      resolve($.text());
    });
  });
};

// 紅外線雲圖
const getInfraredCloudMap = () => {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.cwb.gov.tw/V7/observe/', // 中央氣象局網頁
      method: 'GET'
    }, (error, response, body) => {
      if (error || !body) {
        return;
      }
      const $ = cheerio.load(body); // 載入 body
      const imgRainFall = `http://www.cwb.gov.tw/${$('.newpic01 img').eq(2).attr('src')}`; // 爬最外層的 Table(class=BoxTable) 中的 tr
      resolve(imgRainFall);
    });
  });
};

export default {
  getWeatherMessage,
  getInfraredCloudMap
};
