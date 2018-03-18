var linebot = require('linebot');
var express = require('express');

// var bot = linebot({
//   channelId: '1558003920',
//   channelSecret: 'c4c3841a92fb8e92aa55460e04055801',
//   channelAccessToken: 'f5zi+EsShMeyHvIgAh8/QHC8w+7xeXpJmRwnnHGPZ+KQ5MKgoaxABT00JjYcmTnD9uW30dJOA0SuNynaboP5O9Fbr4JZki9JFIoC61YBlEnWbnmmlNmjJVBXtx+YzbdjgIrDQtS2NJJxk8Vdel+FPAdB04t89/1O/w1cDnyilFU='
// });

var bot = linebot({
  channelId: '1562776481',
  channelSecret: 'af1182fa7a46b9bfc957d0b63ad5b2b4',
  channelAccessToken: 'JQ1XU44aN4eXKjlMAiUgFu9C6B/Krip9p4ypsi3DRzyjnBxkbn90us4aGxSV+9vgZ/o6YJPALFspt4opZFreQyix+aPtl9oxpXSg7NSCE77q0mCmNuvpYrYiDfT1A8sJ1ARwj59zX1KZ9sLupVvNaAdB04t89/1O/w1cDnyilFU='
});


//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function (event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
    //收到文字訊息時，直接把收到的訊息傳回去
    event.reply(msg).then(function (data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(msg);
    }).catch(function (error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：' + error);
    });
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 3020, function () {
  var port = server.address().port;
  console.log('目前的port是', port);
});
