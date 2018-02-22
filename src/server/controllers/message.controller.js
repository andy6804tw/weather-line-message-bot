import request from 'request';
import cheerio from 'cheerio';
import async from 'async';
import axios from 'axios';


const getWeather = () => {
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
const uploadImgur = async (url) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      data: {
        image: url
      },
      headers: {
        authorization: 'Client-ID bc736c3f2e36e86'
      }
    });
    const res = response.data;
    return res.data.link;
  } catch (error) {
    // console.log(error.response);
    return null;
  }
};
const getImgRainFall = () => {
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

const getLocation = () => {
  return new Promise((resolve) => {
    publicIp.v4().then((ip) => {
      iplocation(ip, (error, res) => {
        console.log(res);
        resolve(res);
      });
    });
  });
};


const replyMessage = (event) => {
  if (event.message.text === '全台') {
    async.parallel({
      one(callback) {
        getWeather().then((res) => {
          // event.reply({ type: 'text', text: res });
          callback(null, res);
        });
      },
      two(callback) {
        getImgRainFall().then((res) => {
          uploadImgur(res).then((ress) => {
            console.log(ress);
            if (ress) callback(null, ress);
            else callback(1, null);
          });
        });
      }
    }, (err, results) => {
      if (err) { event.reply({ type: 'text', text: results.one }); }
      event.reply([
        {
          type: 'image',
          originalContentUrl: results.two,
          previewImageUrl: results.two
        },
        { type: 'text', text: results.one }
      ]);
    });
  } else if (event.message.text === '查位置') {
    console.log('in');
    getLocation().then((res) => {
      // 回應位置
      event.reply([
        { type: 'text', text: `city: ${res.city} \r\nlatitude: ${res.latitude} \r\nlongitude: ${res.longitude}` },
        {
          type: 'location',
          title: '您目前位於',
          address: 'location',
          latitude: res.latitude,
          longitude: res.longitude
        }
      ]);
    });
  }
};
const test = (req, res) => {
  res.send('測試');
};


export default {
  replyMessage,
  test
};
