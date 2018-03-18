import express from 'express';
import linebot from './linebot.route';
import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});
/** linebot Router */
router.use('/webhook', linebot);


export default router;
