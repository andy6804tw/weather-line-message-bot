import async from 'async';

import cwbWeatherHelperModel from '../modules/cwbWeatherHelper.module';
import uploadImgur from '../lib/uploadImgur';

const replyMessage = (event) => {
  if (event.message.text === '全台') {
    /* 平行化序列
     * 同時取得縣市概況描述(message)+紅外線雲圖(image)並同時回傳圖片和文字訊息
     * 若 imgur 圖片上傳失敗回傳原始圖片網址
     * */
    async.parallel({
      message(callback) {
        cwbWeatherHelperModel.getWeatherMessage().then((res) => {
          callback(null, res);
        });
      },
      image(callback) {
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
