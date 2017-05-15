const wechat = require("../../util/wechat.js");

Page({
  data: {

  },
  onUnload: function () {

  },
  onLoad: function () {
    
  },
  onReady: function () {

  },
  onShow: function () {
    wechat.auth({
      is_open_setting: false,
      success: function (data) {
        wx.switchTab({
          url: '/view/index/index'
        });
      },
      fail: function () {
        
      }
    }); 
  },
  onHide: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
});
