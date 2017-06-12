const notification = require('../../util/notification.js');
const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
  data: {
    type: 'normal',
    count: 0,
    order_id: '',
    result: 'confirm',
    order: {
      order_number: '',
      order_amount: 0
    }
  },
  onUnload: function () {

  },
  onLoad: function (option) {
    this.setData({
      type: option.type,
      order_id: option.order_id
    });

    setTimeout(() => {
      this.handleLoad();
    }, 300);

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
    var order_id = this.data.order_id;

    http.request({
      url: '/order/confirm',
      data: {
        order_id: order_id
      },
      success: function (data) {
        if (data.order_is_pay) {
          notification.emit("notification_order_result_pay", data);

          this.setData({
            result: 'success',
            order: data
          });
        } else {
          if (this.data.count < 2) {
            this.setData({
              count: this.data.count + 1
            });

            setTimeout(() => {
              this.handleLoad();
            }, 300);
          } else {
            this.setData({
              result: 'error'
            });
          }
        }
      }.bind(this)
    });
  },
  handleHome: function () {
    wx.switchTab({
      url: '/view/index/index'
    })
  },
  handleOrder: function () {
    if (this.data.type == 'BACK') {
      wx.navigateBack();
    } else {
      wx.redirectTo({
        url: '/view/order/index?order_flow=ALL'
      });
    }
  }
});
