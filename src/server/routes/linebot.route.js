import express from 'express';
import linebot from 'linebot';
import messageCtrl from '../controllers/message.controller';
import config from './../../config/config';

// config
const bot = linebot({
  channelId: config.channelId,
  channelSecret: config.channelSecret,
  channelAccessToken: config.channelAccessToken
});
const router = express.Router();


/* Webhook linebot POST */
router.use(bot.parser());

// reply text message
bot.on('message', messageCtrl.replyMessage);


export default router;
