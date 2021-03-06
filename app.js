//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        // wx.setStorageSync('js_code', res.code)
        wx.request({
          url: 'https://wechat.fuyitianjian.net/wechat/wxauth', //接口地址
          method: "POST",
          data: {
            "js_code": res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'requireCaptcha': 0
          },
          success: res => {
            console.log(res.data)
            if (res.data.status == 200 && res.data.results.token) {
              this.globalData.token = res.data.results.token
              wx.setStorageSync('token', res.data.results.token)
              wx.setStorageSync('tenantCode', res.data.results.tenantCode)
            } else {
              // wx.showModal({
              //   title: '错误',
              //   content: '登陆失败' + res.data.message,
              //   showCancel: false, //不显示取消按钮
              //   confirmText: '确定'
              // })
              // wx.navigateTo({
              //   url: '../login/login',
              //   success: res => {
              //     console.log(res)
              //   },
              //   fail: res => {
              //     console.log(res)
              //   }
              // })
              wx.clearStorageSync()
            }
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //获取系统消息
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo1 = res
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.platform)
      }
    })
  },
  globalData: {
    userInfo: null,
    systemInfo1: null,
    token: ""
  }
})