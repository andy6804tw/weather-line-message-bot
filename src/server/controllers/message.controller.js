import async from 'async';

import cwbWeatherHelperModel from '../modules/cwbWeatherHelper.module';
import uploadImgur from '../lib/uploadImgur';

const replyMessage = (event) => {
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
        // 取得天氣小幫手訊息
        // async.waterfall([
        //   (next) => {
        //     const res = cwbWeatherHelperModel.getCityToken(city);
        //     next(null, res);
        //   },
        //   (res1, next) => {
        //     cwbWeatherHelperModel.getWeatherMessage(city).then((res) => {
        //       next(null, res);
        //     });
        //   }
        // ], (err, rst) => {
        //   if (err) throw err; // 匯集 err1 err2 err3
        //   console.log(rst); // 收到的 rst = 上面的 result4
        //   callback(null, rst);
        // });
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
      }
      event.reply([
        {
          type: 'image',
          originalContentUrl: results.image.url,
          previewImageUrl: results.image.url
        },
        { type: 'text', text: results.message }
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
