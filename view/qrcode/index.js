const http = require("../../util/http.js");

Page({
  data: {
    window_width: getApp().globalData.window_width,
    is_load: false,
    qrcode: ''
  },
  onUnload: function () {

  },
  onLoad: function () {
    this.handleLoad();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  handleLoad: function () {
    http.request({
      is_toast: false,
      url: '/member/qrcode/find',
      data: {

      },
      success: function (data) {
        this.setData({
          is_load: true,
          qrcode: data
        });
      }.bind(this)
    });
  }
});
