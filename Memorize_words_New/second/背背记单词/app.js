//app.js
var MD5 = require('/utils/MD5.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
	// 去OLAMI官网申请，然后导入语法模块。

    NLPAppkey: "b4118cd178064b45b7c8f1242bcde31f",
    NLPAppSecret: "7908028332a64e47b8336d71ad3ce9ab",
    NLPUrl: "https://cn.olami.ai/cloudservice/api",
	// 识别客户端ID，用于支持上下文。
    NLPCusid:"",
  },
  NLIRequest:function(corpus,arg) {
    var that = this;
    var appkey = that.globalData.NLPAppkey;
    var appSecret = that.globalData.NLPAppSecret;
    var api = "nli";
    var timestamp = new Date().getTime();
    var sign = MD5.md5(appSecret + "api=" + api + "appkey=" + appkey + "timestamp=" + timestamp + appSecret);
    var rqJson = { "data": { "input_type": 1, "text": corpus }, "data_type": "stt" };
    var rq = JSON.stringify(rqJson);
    var nliUrl = that.globalData.NLPUrl;
    var cusid = that.globalData.NLPCusid;
    console.log("[Console log]:NLIRequest(),URL:" + nliUrl);
    wx.request({
      url: nliUrl,
      data: {
        appkey: appkey,
        api: api,
        timestamp: timestamp,
        sign: sign,
        rq: rq,
        cusid: cusid,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        var resData = res.data;
        console.log("[Console log]:NLIRequest() success...");
        console.log("[Console log]:Result:");
        console.log(resData);
        var nli = JSON.stringify(resData);
        typeof arg.success == "function" && arg.success(nli);
        
      },
      fail: function (res) {
        console.log("[Console log]:NLIRequest() failed...");
        //console.error("[Console log]:Error Message:" + res.errMsg);
        typeof arg.fail == "function" && arg.fail();
      },
      complete: function () {
        console.log("[Console log]:NLIRequest() complete...");
        typeof arg.complete == "function" && arg.complete();
      }
    })
  },
})