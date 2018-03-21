[![GitHub travis][travis-image]][travis-url]
[![GitHub license][license-image]][license-url]
[![Coverage Status](https://coveralls.io/repos/github/andy6804tw/Mocha-Chai-tutorial/badge.svg?branch=master)](coverage-url)

# Line 氣象機器人 Weather Bot

## QR code of Weather bot
Use this QR code to add your bot as a friend.
You can also add bot to join your group chats.

<img src="./Screenshoot/qrcode.png">

## Features
目前支援指令，以及其說明：
      
【快速按鈕使用】
- 全臺概況(圖)
- 目前天氣(圖)
- 空氣品質(圖)
- 紫外線(圖)
- 地震(圖)
      
【進階指令】
1. 縣市概況：
在對話框輸入(台灣的縣市+概況)即可查詢一日天氣狀況描述與即時紅外線雲圖。
例如：臺南市概況、臺中市概況

## Develop
### Clone Project
 you can clone this project using git command-line interface:

```bash
$ git clone https://github.com/andy6804tw/weather-line-message-bot.git
$ cd weather-line-message-bot
```

### Installation
When that's done, install the project dependencies.You can use npm or yarn(recommended) for dependency management。

```bash
$ npm install
```

### Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

- npm run `<script>`
- yarn `<script>`

| Script | Description |
| ------| ------ |
| start | Running node index.js |
| debug | Develop status |
| build | Deploy project to product |
| serve | Pfficially online in server |
| test  | Unit testing with mocha|
| coverage | using istanbuljs/ync calculate coverage |

### Settings and Customizing
#### API Keys
You should use your own line bot API keys by modify `.env` file, following:

- CHANNEL_ID
- CHANNEL_SERECT
- CHANNEL_ACCESS_TOKEN

https://developers.line.me

### Heroku

Currently this repo is running by Heroku: https://weather-line-message-bot.herokuapp.com/

Use webhook to receive message and reply to users.

### Docker

in building

## Reference

- [LINE BOT API (third-party)](https://github.com/boybundit/linebot)
- [Messaging API Document (official)](https://developers.line.me/en/docs/messaging-api/getting-started/)

## LICENSE
MIT

[travis-image]: https://travis-ci.org/andy6804tw/weather-line-message-bot.svg?branch=master
[travis-url]: https://travis-ci.org/andy6804tw/weather-line-message-bot
[license-image]: https://img.shields.io/npm/l/express.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com
[license-url]: https://github.com/andy6804tw/weather-line-message-bot/blob/master/LICENSE
[coverage-url]:https://coveralls.io/github/andy6804tw/Mocha-Chai-tutorial?branch=master

