"use strict";var ias=require("../../../api.js");var aes=require("../../../static/aes/aesUtil.js");var app=getApp();var innerAudioContext=wx.createInnerAudioContext();innerAudioContext.onError(function(res){console.log(res.errMsg);console.log(res.errCode);});Page({data:{curTimeVal:"00:00",isSpeaking:false,play:true},onLoad:function onLoad(option){var _that=this;innerAudioContext.src=wx.getStorageSync('audioURL');innerAudioContext.onPlay(function(){console.log('录音播放中');_that.updateTime(_that);});innerAudioContext.onStop(function(){console.log('录音播放停止');});innerAudioContext.onEnded(function(){console.log('录音播放结束');_that.setStopState(_that);});},onUnload:function onUnload(e){console.log("停止播放");innerAudioContext.stop();},play:function play(e){console.log("click BTN");var that=this;if(that.data.play){innerAudioContext.play();}else{that.pause();}
that.setData({play:!that.data.play});},pause:function pause(){innerAudioContext.pause();},updateTime:function updateTime(that){innerAudioContext.onTimeUpdate(function(res){console.log("duratio的值：",timeStamp(innerAudioContext.duration.toFixed()));console.log("curTimeVal的值：",timeStamp(innerAudioContext.currentTime.toFixed()));that.setData({duration:innerAudioContext.duration.toFixed(),curTimeVal:timeStamp(innerAudioContext.currentTime.toFixed())});});},slideBar:function slideBar(e){var _this=this;var that=this;var curval=e.detail.value;innerAudioContext.seek(curval);innerAudioContext.onSeeked(function(res){_this.updateTime(that);});},setStopState:function setStopState(that){that.setData({curTimeVal:"00:00",play:!that.data.play});}});function timeStamp(second_time){var time=parseInt(second_time);if(parseInt(second_time)<10){time="00:0"+time;}else if(parseInt(second_time)>=10&&parseInt(second_time)<60){time="00:"+time;}else{var second=parseInt(second_time)%60;var min=parseInt(second_time/60);if(second<10){time="0"+min+":0"+second;}else{time="0"+min+":"+second;}
if(min>60){min=parseInt(second_time/60)%60;var hour=parseInt(parseInt(second_time/60)/60);time=hour+"小时"+min+"分"+second+"秒";if(hour>24){hour=parseInt(parseInt(second_time/60)/60)%24;var day=parseInt(parseInt(parseInt(second_time/60)/60)/24);time=day+"天"+hour+"小时"+min+"分"+second+"秒";}}}
return time;}