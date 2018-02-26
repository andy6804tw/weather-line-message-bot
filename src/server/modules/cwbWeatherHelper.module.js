import request from 'request';
import cheerio from 'cheerio';

// 取得縣市 Token
const getCityToken = (city) => {
  switch (city) {
    case '全臺':
      return 'W50';
    case '臺北市':
      return 'W50_63';
    case '新北市':
      return 'W50_65';
    case '桃園市':
      return 'W50_68';
    case '臺中市':
      return 'W50_66';
    case '臺南市':
      return 'W50_67';
    case '高雄市':
      return 'W50_64';
    case '基隆市':
      return 'W50_10017';
    case '新竹縣':
      return 'W50_10004';
    case '新竹市':
      return 'W50_10018';
    case '苗栗縣':
      return 'W50_10005';
    case '彰化縣':
      return 'W50_10007';
    case '南投縣':
      return 'W50_10008';
    case '雲林縣':
      return 'W50_10009';
    case '嘉義縣':
      return 'W50_10010';
    case '嘉義市':
      return 'W50_10020';
    case '屏東縣':
      return 'W50_10013';
    case '宜蘭縣':
      return 'W50_10002';
    case '花蓮縣':
      return 'W50_10015';
    case '臺東縣':
      return 'W50_10014';
    case '澎湖縣':
      return 'W50_10016';
    case '金門縣':
      return 'W50_09020';
    case '連江縣':
      return 'W50_09007';
    default:
      return '';
  }
};

// 天氣小幫手
const getWeatherMessage = (city) => {
  const cityToken = getCityToken(city);
  console.log(cityToken);
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.cwb.gov.tw/V7/forecast/taiwan/Data/${cityToken}.txt`, // 中央氣象局網頁
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
  getCityToken,
  getWeatherMessage,
  getInfraredCloudMap
};
