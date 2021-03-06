//路径根据自己项目路径修改
var ias = require("../../api.js")
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["设备详情", "维修记录"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    info:{},
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    equip:{},
    repair:[],
    deviceID:"",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000

  },
  onLoad: function (option) {
    var that = this;
    that.setData({
      deviceID:option.id
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    that.getRepairDetail();
  },
  getRepairDetail:function (e){
    var _this = this;
    var data = {
      "id": _this.data.deviceID
    }
    //路径根据自己项目路径修改
    ias.requestLoading('POST', ias.api.drivceDetail, JSON.stringify(data).encode(), '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      _this.setData({
        equip: res.results.equip,
        repair: res.results.repair,
        deviceID: res.results.equip.id,
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  repair:function(e){
    var id = this.data.deviceID;
    wx.navigateTo({
      url: '../repair_task/index?deviceID=' + id
    })
  }
});
