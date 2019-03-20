const app = getApp();

Page({
  data: {
    id1: "",
    id2: "",
    bol1: false,
    bol2: false,
    building: null,
    floor: null,
    room: null,
    roomId: null,
    installationPosition: "",
    list: null
  },
  /**
  * 监听页面开在加载的状态
  * 页面加载完成之后就不会在执行
  */
  onLoad: function () {
    var _that = this
    _that.setData({
      list: wx.getStorageSync('locationProject')
    })
    console.log(wx.getStorageSync('locationProject'))
  },
  
  kindToggle1: function (e) {
    this.setData({
      building: e.currentTarget.dataset.text
    })
    if (this.data.id1 != e.currentTarget.dataset.id) {
      this.setData({
        bol1: true,
        id1: e.currentTarget.dataset.id,
        bol2: false,
        id2: ""
      });
    } else {
      this.setData({
        bol1: !this.data.bol1,
        id1: e.currentTarget.dataset.id,
        bol2: false,
        id2: ""
      });
    }
  },
  kindToggle2: function (e) {
    this.setData({
      floor: e.currentTarget.dataset.text
    })
    if (this.data.id2 != e.currentTarget.dataset.id) {
      this.setData({
        bol2: true,
        id2: e.currentTarget.dataset.id
      });
    } else {
      this.setData({
        bol2: !this.data.bol2,
        id2: e.currentTarget.dataset.id
      });
    }
  },
/**
 * 选择项目
 */
  okRepair: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
   
    // prevPage.setData({
    //   project: e.currentTarget.dataset.project
    // })
  },
  /**
  * 选择类别
  */
  selectCategory: function (e) {
    var _this = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var strType = "allParams.roomId"

    _this.setData({
      room: e.currentTarget.dataset.text,
      roomId: e.currentTarget.dataset.id
    })

    prevPage.setData({
      installationPosition: _this.data.building + "-" + _this.data.floor + "-" + _this.data.room,
      [strType]: e.currentTarget.dataset.id
    })
    wx.navigateBack({ changed: true }); 
   
  },
 
});
