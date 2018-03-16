import async from 'async';

import cwbWeatherHelperModel from '../modules/cwbWeatherHelper.module';
import cwbEarthquack from '../modules/cwbEarthquack.module';
import cwbCurrentWeather from '../modules/cwbCurrentWeather.module';
import cwbCurrentUva from '../modules/cwbCurrentUva.module';
import cwbCurrentAqi from '../modules/cwbCurrentAqi.module';
import uploadImgur from '../lib/uploadImgur';

const replyMessage = (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.indexOf('概況') > -1) {
      /* 平行化序列
       * 同時取得縣市概況描述(message)+紅外線雲圖(image)並同時回傳圖片和文字訊息
       * 若 imgur 圖片上傳失敗回傳原始圖片網址
       * Tip:要求使用者輸入[縣市+概況]中間可以有空白
       * */

      // 取得縣市名稱 ex: 臺北市概況 => 臺北市
      const city = event.message.text.split('概況')[0].trim();
      async.parallel({
        message(callback) {
          cwbWeatherHelperModel.getWeatherMessage(city).then((res) => {
            callback(null, res);
          });
        },
        image(callback) {
          // 取得紅外線雲圖
          cwbWeatherHelperModel.getInfraredCloudMap().then((resUrl) => {
            uploadImgur(resUrl).then((res) => {
              callback(null, res);
            });
          });
        }
      }, (err, results) => {
        if (!results.image.success) {
          event.reply([
            {
              type: 'text', text: results.image.url
            },
            { type: 'text', text: results.message }
          ]);
        } else {
          event.reply([
            {
              type: 'image',
              originalContentUrl: results.image.url,
              previewImageUrl: results.image.url
            },
            { type: 'text', text: results.message }
          ]);
        }
      });
    } else if (event.message.text.indexOf('地震') > -1) {
      cwbEarthquack.getImage().then((result) => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({
            type: 'image',
            originalContentUrl: result.url,
            previewImageUrl: result.url
          });
        }
      });
    } else if (event.message.text.indexOf('目前天氣') > -1) {
      cwbCurrentWeather.getImage().then((result) => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({
            type: 'image',
            originalContentUrl: result.url,
            previewImageUrl: result.url
          });
        }
      });
    } else if (event.message.text.indexOf('紫外線') > -1) {
      cwbCurrentUva.getImage().then((result) => {
        if (!result.success) {
          // 團片上傳失敗回應網址
          event.reply({ type: 'text', text: result.url });
        } else {
          // 上傳成功回覆圖片
          event.reply({
            type: 'image',
            originalContentUrl: result.url,
            previewImageUrl: result.url
          });
        }
      });
    } else if (event.message.text.indexOf('空氣品質') > -1) {
      async.parallel({
        image(callback) {
          // 取得全台空氣品質圖
          cwbCurrentAqi.getImage().then((resUrl) => {
            callback(null, resUrl);
          });
        },
        message(callback) {
          // 取得空氣品質訊息
          cwbCurrentAqi.getAqiMessage().then((res) => {
            callback(null, res);
          });
        }
      }, (err, results) => {
        if (!results.image.success) {
          event.reply([
            {
              type: 'text', text: results.image.url
            },
            { type: 'text', text: results.message }
          ]);
        } else {
          event.reply([
            {
              type: 'image',
              originalContentUrl: results.image.url,
              previewImageUrl: results.image.url
            },
            { type: 'text', text: results.message }
          ]);
        }
      });
    }
  }
};
const test = (req, res) => {
  res.send('測試');
};


export default {
  replyMessage,
  test
};
