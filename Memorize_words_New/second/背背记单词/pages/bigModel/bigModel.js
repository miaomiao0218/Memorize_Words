//index.js

var app = getApp();
var that;
var chatListData = [];

Page({
  data: {
    askWord: '',
    sendButtDisable:true,
    userInfo: {},
    chatList: [],
    scrolltop:'',
    userLogoUrl:'/res/image/me.jpg',
  },
  onLoad: function () {
    //console.log("我的头像")
    that = this;
    app.getUserInfo(function (userInfo) {
      var aUrl = userInfo.avatarUrl;
      if(aUrl != null){
        that.setData({
          userLogoUrl: aUrl
        });
      }
    });
  },
  onReady: function () {
    setTimeout(function () {
      that.addChat('你好！我们来聊天吧！我可以帮你翻译哦！', 'l');
    }, 1000);
  },

  Typing:function(e){
    var inputVal = e.detail.value;
    var buttDis = true;
    if(inputVal.length != 0){
      var buttDis = false;
    }
    that.setData({
      sendButtDisable: buttDis,
    })
  },

  sendChat: function (e) {

    let word = e.detail.value.ask_word ? e.detail.value.ask_word : e.detail.value;
    that.addChat(word, 'r');
    
    that.setData({
      askWord: '',
      sendButtDisable: true,
    });

    app.NLIRequest(word, {
      'success': function (res) {
        if(res.status == "error"){
          wx.showToast({
            title: '返回数据有误！',
          })
          return;
        }
        that.NLIProcess(res);
      },
      'fail':function(res){
        wx.showToast({
          title: '请求失败！',
        })
        return;
      }
    }); 
  },

  NLIProcess: function(res){
    var nlires = JSON.parse(res);
    var nliArray = nlires.data.nli;
    if(nliArray.length == 0){
      wx.showToast({
        title: '返回数据有误！',
      })
      return;
    }
    var answer = nliArray[0].desc_obj.result;
    if(answer == null){
      wx.showToast({
        title: '返回数据有误！',
      })
      return;
    }
    that.addChat(answer, 'l');
    var dataArray = nliArray[0].data_obj;
    if(dataArray != null && dataArray.length > 0){
      var content = dataArray[0].content;
      if (content != null && content != answer){
        that.addChat(content, 'l');
      }
    }
    return;
  },
  addChat: function (word, orientation) {
    let ch = { 'text': word, 'time': new Date().getTime(), 'orientation': orientation };
    chatListData.push(ch);
    var charlenght = chatListData.length;
    that.setData({
      chatList: chatListData,
      scrolltop: "roll" + charlenght,
    });
  }
})
