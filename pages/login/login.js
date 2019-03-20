
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isready:false,
    phone: null, //手机号
    password: null, //密码
    js_code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        this.setData({ js_code: res.code });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.userInfo)
  },
  searchInputPhone: function (e) {
    this.setData({ phone: e.detail.value });
  },
  searchInputPassword: function (e) {
    this.setData({ password: e.detail.value });
  },
  searchClickLogin: function (e) {
    console.log(this.data.phone, this.data.password)
    if (!this.data.isready) {  
      this.setData({ isready: true });
      if (!this.data.phone) {
        wx.showModal({
          title: '错误',
          content: '请输入手机号',
          showCancel: false, //不显示取消按钮
          confirmText: '确定'
        })
        this.setData({ isready: false });
      } else if (!this.data.password){
        wx.showModal({
          title: '错误',
          content: '请输入密码',
          showCancel: false, //不显示取消按钮
          confirmText: '确定'
        })
        this.setData({ isready: false });
      }else{ 
        this.setData({ isready: true });
        let _that=this
        wx.request({
          url: 'https://wechat.fuyitianjian.net/wechat/login', //接口地址
          method: "POST",
          data: {
            "phone": this.data.phone,
            "password": this.data.password,
            "js_code": this.data.js_code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'requireCaptcha': 0
          },
          success: res => {
            console.log(res.data)
            if (res.data.status == 200){
              app.globalData.token = res.data.results.token
              wx.setStorageSync('token', res.data.results.token)
              wx.setStorageSync('tenantCode', res.data.results.tenantCode)
              // console.log(app.globalData.token)
                wx.navigateBack({ changed: true }); 
            }else{
              wx.showModal({
                title: '错误',
                content: '登陆失败' + res.data.message,
                showCancel: false, //不显示取消按钮
                confirmText: '确定',
                success: function (res) {
                  _that.setData({ isready: false });
                }
              })
              wx.login({
                success: res => {
                  this.setData({ js_code: res.code });
                }
              }) 
            }
            
          },
          fail: res => {
            console.log(res)
          }
        }) 
      }
    }
  }

  

 
})