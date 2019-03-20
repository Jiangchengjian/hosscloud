"use strict";var ias=require("../../../api.js");var aes=require("../../../static/aes/aesUtil.js");var app=getApp();var mp3Recorder=wx.getRecorderManager();var mp3RecoderOptions={duration:30000,sampleRate:16000,numberOfChannels:1,encodeBitRate:48000,format:'mp3'};Page({data:{curTimeVal:"00:00",isSpeaking:false,flag:false},onLoad:function onLoad(){var _that=this;mp3Recorder.onStart(function(){console.log('mp3Recorder.onStart()...');});mp3Recorder.onStop(function(res){console.log(res);var tempFilePath=res.tempFilePath,urls=ias.api.uploadFile;wx.setStorageSync('audioURL',tempFilePath);processFileUploadForMedia(urls,tempFilePath,_that);});},touchdown:function touchdown(){var _this=this;var i=0,time=null;var timer=setInterval(function(){if(_this.data.flag||i>30){clearInterval(timer);}
i++;console.log(i);if(parseInt(i)<10){time="00:0"+i;}else{time="00:"+i;}
_this.setData({curTimeVal:time});},1000);this.setData({isSpeaking:true});mp3Recorder.start(mp3RecoderOptions);},touchup:function touchup(){console.log("mp3Recorder.stop");this.setData({isSpeaking:false,flag:true});mp3Recorder.stop();}});function processFileUploadForMedia(urls,filePath,_this){wx.uploadFile({url:ias.api.basePath+urls,filePath:filePath,name:'file',header:{'content-type':'multipart/form-data'},success:function success(res){console.log(res);console.log("add audio");wx.navigateBack({changed:true});var resAll=JSON.parse(res.data).results;var resID=resAll.id,typeID=resAll.type;var pages=getCurrentPages();var currPage=pages[pages.length-1];var prevPage=pages[pages.length-2];prevPage.data.audioID.push(resID);prevPage.setData({audioURL:filePath});},fail:function fail(res){wx.showModal({title:'提示',content:"网络请求失败，请确保网络是否正常",showCancel:false,success:function success(res){}});wx.hideToast();}});}