//index.js
//获取应用实例
const app = getApp();
var api = require('../../api.js');
var aes = require('../../static/aes/aesUtil.js');

Page({
  data: {
    status: 1,
    url: null,
    createDt: null,
    reason: null,
    type: null
  },
  onShow: function () {
    
  },
  onLoad: function () {


  },
  onReady: function () {
    this.setData({
      status: wx.getStorageSync('status'),
      url: wx.getStorageSync('url'),
      createDt: wx.getStorageSync('createDt'),
      reason: wx.getStorageSync('reason'),
      type: wx.getStorageSync('type')
    });
  }



})
