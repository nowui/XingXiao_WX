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
      is_toast: !this.data.is_load,
      url: '/member/team/list',
      data: {

      },
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].member_commission_amount = data[i].member_commission_amount.toFixed(2);
          data[i].member_order_amount = data[i].member_order_amount.toFixed(2);
        }

        this.setData({
          is_load: true,
          member_list: data
        });
      }.bind(this)
    });
  }
});
