const constant = require("../../util/constant.js");
const storage = require("../../util/storage.js");
const http = require("../../util/http.js");
const wechat = require("../../util/wechat.js");

Page({
  data: {
    color: constant.color,
    user_name: '',
    user_avatar: '',
    member_level_id: '',
    member_level_name: '',
    member_level_value: 999,
    member_total_amount: 0,
    member_status: false,
    WAIT_PAY: 0,
    WAIT_SEND: 0,
    WAIT_RECEIVE: 0
  },
  onUnload: function () {

  },
  onLoad: function () {
    this.handleLoad();
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
      is_toast: false,
      url: '/member/my/find',
      data: {

      },
      success: function (data) {
        this.setData(data);
      }.bind(this)
    });
  }
});
