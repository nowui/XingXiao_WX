const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
  data: {
    is_load: false,
    member_list: []
  },
  onUnload: function () {
    
  },
  onLoad: function () {
  },
  onReady: function () {

  },
  onShow: function () {
    this.handleLoad();
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
      url: '/member/team/list',
      data: {

      },
      success: function (data) {
        this.setData({
          is_load: true,
          member_list: data
        });
      }.bind(this)
    });
  }
});
