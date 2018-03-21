/* global describe it */
import { expect } from 'chai';
import cwbWeatherHelperModel from '../src/server/modules/cwbWeatherHelper.module';
import cwbCurrentWeather from '../src/server/modules/cwbCurrentWeather.module';
import cwbCurrentAqi from '../src/server/modules/cwbCurrentAqi.module';
import cwbCurrentUva from '../src/server/modules/cwbCurrentUva.module';
import cwbEarthquack from '../src/server/modules/cwbEarthquack.module';


describe('天氣概況', () => {
  it('should return city token', (done) => {
    const cityArray = ['全臺', '臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '基隆市', '新竹縣', '新竹市', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '屏東縣',
      '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣', ''];
    for (let i = 0; i < cityArray.length; i += 1) {
      expect(cwbWeatherHelperModel.getCityToken(cityArray[i])).to.be.a('string');
    }
    done();
  });
  it('should return weather message', async () => {
    const result = await cwbWeatherHelperModel.getWeatherMessage('臺南市');
    expect(result).to.be.a('string');
    expect(result).to.not.have.string('rejected.');
    expect(result).to.not.have.string('Object not found!');
  });
  it('should return 紅外線 image', async () => {
    const result = await cwbWeatherHelperModel.getImage();
    expect(result.url).to.be.a('string');
    expect(result.success).to.be.true;
  });
});

describe('目前天氣', () => {
  it('should return Taiwan weather detail image', async () => {
    const result = await cwbCurrentWeather.getImage();
    expect(result.url).to.be.a('string');
    expect(result.success).to.be.true;
  });
});

describe('空氣品質', () => {
  it('should return AQI message', async () => {
    const result = await cwbCurrentAqi.getAqiMessage();
    expect(result).to.not.have.string('404');
  });
  it('should return AQI image', async () => {
    const result = await cwbCurrentAqi.getImage();
    expect(result.url).to.be.a('string');
    expect(result.success).to.be.true;
  });
});

describe('紫外線', () => {
  it('should return Taiwan weather detail image', async () => {
    const result = await cwbCurrentUva.getImage();
    expect(result.url).to.be.a('string');
    expect(result.success).to.be.true;
  });
});

describe('地震', () => {
  it('should return Taiwan weather detail image', async () => {
    const result = await cwbEarthquack.getImage();
    expect(result.url).to.be.a('string');
    expect(result.success).to.be.true;
  });
});
