/* global describe it before */
const { expect } = require('chai');

const supertest = require('supertest');

import cwbWeatherHelperModel from '../src/server/modules/cwbWeatherHelper.module';


describe('天氣概況', () => {
  it('should return city token', (done) => {
    expect(cwbWeatherHelperModel.getCityToken('臺南市')).to.be.a('string');
    done();
  });
  it('should return city token', (done) => {
    cwbWeatherHelperModel.getWeatherMessage('臺南市').then((res) => {
      expect(res).to.be.a('string');
    });
    done();
  });
});

