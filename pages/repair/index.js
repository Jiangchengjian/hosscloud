
var ias = require("../../api.js")
var aes = require("../../static/aes/aesUtil.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null, //手机号
    password: null, //密码
    duration: null,
    url: null,
    down: true
  },
  onShow: function(options) {
     // 生命周期函数--监听小程序显示(后退到这个页面的时候这个就会被回调)    当小程序启动，或从后台进入前台显示，会触发 onShow    
    console.log(wx.getStorageSync('token'))

    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../login/login',
        success: res => {
          console.log(res)
        },
        fail: res => {
          console.log(res)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //扫码直接进小程序不需要先打开后进去
    // console.log(decodeURIComponent(options.q))
    // let request_url = decodeURIComponent(options.q)
    // if (options.q && wx.getStorageSync('token')){
    //   wx.request({
    //     url: request_url.match(/^(https:[^:])/) ? request_url : request_url.replace('http', 'https'), //接口地址
    //     header: {
    //       'content-type': 'application/json', // 默认值
    //       'User2-Agent': 'wechat.com'
    //     },
    //     success: (res) => {
    //       console.log(res.data.results)
    //       if (res.data.results.qcCodeType == "roomCode") {
    //         wx.setStorageSync('roomid', res.data.results.id)
    //         wx.setStorageSync('tenantCode', res.data.results.tenantCode)
    //         wx.navigateTo({
    //           url: '../select_device/index?id=' + res.data.results.id
    //         })
    //       } else {
    //         wx.setStorageSync('device_id', res.data.results.id)
    //         wx.setStorageSync('tenantCode', res.data.results.tenantCode)
    //         wx.navigateTo({
    //           url: '../device_detail/index?id=' + res.data.results.id
    //         })
    //       }

    //     },
    //     fail: (res) => {
    //       console.log(res)
    //     }
    //   })
    // }else{
    //   // wx.navigateTo({
    //   //   url: '../login/login',
    //   //   success: res => {
    //   //     console.log(res)
    //   //   },
    //   //   fail: res => {
    //   //     console.log(res)
    //   //   }
    //   // })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(wx.getStorageSync('token'))
  },
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.setStorageSync('result', res.result)
        wx.request({
          url: res.result.match(/^(https:[^:])/) ? res.result:res.result.replace('http','https'), //接口地址
          header: {
            'content-type': 'application/json', // 默认值
            'User2-Agent': 'wechat.com'
          },
          success:(res) => {
            console.log(res.data.results)
            wx.removeStorageSync('chooseText')
            if (res.data.results.qcCodeType == "roomCode"){
              wx.setStorageSync('roomid', res.data.results.id)
              wx.setStorageSync('tenantCode', res.data.results.tenantCode)
              wx.navigateTo({
                url: '../select_device/index?id=' + res.data.results.id
              })
            }else{
              wx.setStorageSync('device_id', res.data.results.id)
              wx.setStorageSync('tenantCode', res.data.results.tenantCode)
              wx.navigateTo({
                url: '../device_detail/index?id=' + res.data.results.id
              })
            }
            
          },
          fail: (res) =>{
            console.log(res)
          }
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 1000
        })
      }, 
    })
  },


  chooseVideo: function(){
    var that = this
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 30,
      camera: 'back',
      success: function (res) {
        console.log('add video')
        that.setData({
          url: res.tempFilePath,
          duration: res.duration
        })
        wx.showLoading({
          title: '正在上传中!',
        })
        that.sub()
      }
    })
  },

  chooseAudio: function() {
    wx.navigateTo({
      url: '../repair/audio'
    })
  },

  chooseText: function () {
    wx.setStorageSync('chooseText', true)
    wx.navigateTo({
      url: '../repair_task/index'
    })
  },

  sub: function(){
    var tempFilePath = this.data.url,
      urls = ias.api.uploadFile;
    let that = this
    //上传视频
    // processFileUploadForMedia(urls, tempFilePath);

    let duration = this.data.duration

    let audioRepair = ias.api.basePath + ias.api.videoRepair

    if (tempFilePath) {

      wx.uploadFile({
        url: ias.api.basePath + urls,
        filePath: tempFilePath,
        name: 'file',
        // formData: { "appKey": appkey, "appSecret": appsecret, "userId": UTIL.getUserUnique() },
        header: { 'content-type': 'multipart/form-data' },
        success: function (res) {
          console.log(JSON.parse(res.data));
          if (JSON.parse(res.data).status == 200) {
            // wx.navigateBack({ changed: true });
            let uploadId = JSON.parse(res.data).results.id
            let data = {
              "uploadId": uploadId,
              "ioLength": duration
            }
            wx.request({
              url: audioRepair, //接口地址
              method: "POST",
              data: JSON.stringify(data).encode(),
              header: {
                'content-type': 'application/json', // 默认值
                'token': wx.getStorageSync('token')
              },
              success: res => {
                console.log(res.data)
                if (res.data.status == 200) {
                  // wx.navigateBack({ changed: true });
                  wx.showToast({
                    title: '报修成功',
                    icon: 'success',
                    duration: 1000,
                    success: function (res) {
                      // setTimeout(function () {
                      //   wx.navigateBack({ changed: true })
                      // }, 1000)
                    }
                  })
                } else {
                  wx.showModal({
                    title: '错误',
                    content: '报修失败' + JSON.parse(res.data).message,
                    showCancel: false, //不显示取消按钮
                    confirmText: '确定'
                  })
                }
              }
            })
          } else {
            wx.showModal({
              title: '错误',
              content: '报修失败' + JSON.parse(res.data).message,
              showCancel: false, //不显示取消按钮
              confirmText: '确定'
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: "网络请求失败，请确保网络是否正常",
            showCancel: false,
            success: function (res) {
            }
          });
        }
      });
    }

  }

  

 
})