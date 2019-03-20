//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bol:false,
    indexs: null,
    questions: [{ 'question': '1、如何扫码报修呢？', 'answer': '点击扫码报修，对准二维码，加载出对应的设备或房间信息。如是房间，则选择房间内的设备，找不到具体设备，选择其他；再选择具体故障原因，即可完成报修。' }, { 'question': '2、如何视频报修呢？', 'answer': '点击视频报修，对故障发生出进行拍摄视频，并口述该故障发生的位置（如XX楼XX房间）、故障现象，便于调度员处理报修信息。' }, { 'question': '3、报修后响应时间是多少？', 'answer': '一般情况，调度中心会在3-5分钟内处理报修信息，并安排工人到达现场。' }, { 'question': '4、报修都是包含哪些类型？', 'answer': '报修主要针对的灯、水、电等物业报修，还包含了办公用品、重大设备、弱点等设备的报修。' }, { 'question': '5、维修可以进行投诉或者满意度打分吗？', 'answer': '一般维修结束后，工人会要求您签字确认。如果您对维修不满意，可以进行投诉或者评价，会有客服与您进行沟通处理。' }, { 'question': '6、如何查看报修进度？', 'answer': '点击订单，可以看到报修订单的执行状态，点击可以查看具体详情及状态时间轴。' }, { 'question': '7、如何刷新订单？', 'answer': '订单列表，下拉刷新。' }, { 'question': '8、拍摄的视频大小和时长有限制吗？', 'answer': '建议您视频大小不要超过10，时长不要超过30秒' }]
  },
  toanser: function (e) {
    // console.log(this.data.indexs,e.currentTarget.dataset.index,this.data.bol)
    if (this.data.indexs != e.currentTarget.dataset.index){
      this.setData({
        bol: true,
        indexs: e.currentTarget.dataset.index
      });
    }else{
      this.setData({
        bol: !this.data.bol,
        indexs: e.currentTarget.dataset.index
      });
    }

  }

})

