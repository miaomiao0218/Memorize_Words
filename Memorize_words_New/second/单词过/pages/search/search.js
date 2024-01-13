// pages/about/about.js


// 导入发音接口即“InnerAudioContext”API
const innerAudioContext = wx.createInnerAudioContext();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:{}  /*用于存储从服务器获取的数据。*/ 
  },

  /**
   * 生命周期函数--监听页面加载生命周期函数：

包括onLoad（页面加载）、onReady（初次渲染完成）、onShow（页面显示）、onHide（页面隐藏）、onUnload（页面卸载）等生命周期函数。在这个代码中这些生命周期函数均未做特定的处理。
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
/*即返回到上一个页面。*/ 
back:function(){
  wx.navigateBack()
},







/*提交表单的请求处理函数（submit和submitone函数）：
submit函数和submitone函数分别处理两个不同的表单提交操作。
使用wx.request发起HTTP请求，其中method指定请求方法（POST或GET），data携带了表单的数据，url指定了请求的服务器地址。
请求成功后，通过回调函数获取服务器返回的数据，并将其设置到页面的text数据中，以便在页面中展示。*/
//提交
submit:function(e){
  var that=this
  wx.request({
    method:'POST',
    data:e.detail.value,
    url: 'http://127.0.0.1:3000/show',
    success:function(res){
      console.log(res.data)
      that.setData({text:res.data})
      // var test = res.data
      // console.log(text)
    }
  })
},

submitone:function(e){
  var that=this
  wx.request({
    method:'GET',
    data:e.detail.value,
    url: 'http://127.0.0.1:3000/output',
    success:function(res){
      console.log(res.data)
     that.setData({text:res.data})
      // var test = res.data
      // console.log(text)
    }
  })
}

})
