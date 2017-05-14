const http = require("../../util/http.js");

Page({
  data: {
    is_load: false,
    bill_list: []
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
      url: '/bill/list',
      data: {
        page_index: 0,
        page_size: 0
      },
      success: function (data) {
        this.setData({
          is_load: true,
          bill_list: data
        });
      }.bind(this)
    });
  }
});
