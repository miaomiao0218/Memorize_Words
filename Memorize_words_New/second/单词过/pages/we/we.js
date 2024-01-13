// pages/manual/manual.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sectionStyle: 'margin-bottom: 10rpx;', // 设置初始的section样式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载时可以设置一些样式
    this.setData({
      sectionStyle: 'margin-bottom: 10rpx;', // 修改section样式
    });
  },

  // 其他生命周期函数和事件处理函数等省略...
});
