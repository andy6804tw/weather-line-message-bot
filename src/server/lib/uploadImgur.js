import axios from 'axios';

// imgur API 上傳圖片
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
    const result = Object.assign({ success: true, url: response.data.data.link });
    return result;
  } catch (error) {
    // 圖片上傳失敗，回傳原始圖片網址
    const result = Object.assign({ success: false, url });
    return result;
  }
};

export default uploadImgur;
