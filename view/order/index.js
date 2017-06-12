const notification = require('../../util/notification.js');
const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
  data: {
    order_status_list: constant.order_status_list,
    window_width: getApp().globalData.window_width,
    slider_offset: 0,
    slider_left: 0,
    slider_width: 0,
    is_load: false,
    list: [],
    order_flow: '',
    order_list: []
  },
  onUnload: function () {
    notification.remove("notification_order_result_pay", this);
  },
  onLoad: function (option) {
    notification.on("notification_order_result_pay", this, function (data) {
      this.handleLoad();
    });

    var index = 0;
    for (var i = 0; i < this.data.order_status_list.length; i++) {
      if (option.order_flow == this.data.order_status_list[i].order_status_value) {
        index = i;

        break;
      }
    }

    var slider_width = this.data.window_width / this.data.order_status_list.length;

    this.setData({
      slider_left: 0,
      slider_offset: slider_width * index,
      slider_width: slider_width,
      order_flow: option.order_flow
    });

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
      url: '/order/list',
      data: {
        page_index: 0,
        page_size: 0
      },
      success: function (data) {
        var order_list = [];

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].product_list.length; j++) {
            data[i].product_list[j].product_image_file = constant.host + data[i].product_list[j].product_image_file;
            
            data[i].product_list[j].order_product_price = data[i].product_list[j].order_product_price.toFixed(2);
          }

          data[i].order_amount = data[i].order_amount.toFixed(2);

          if (data[i].order_flow == this.data.order_flow || this.data.order_flow == 'ALL') {
            order_list.push(data[i]);
          }
        }

        this.setData({
          is_load: true,
          list: data,
          order_list: order_list
        });
      }.bind(this)
    });
  },
  handleTab: function (event) {
    var order_flow = event.currentTarget.id;
    var order_list = [];

    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].order_flow == order_flow || order_flow == 'ALL') {
        order_list.push(this.data.list[i]);
      }
    }

    this.setData({
      slider_offset: event.currentTarget.offsetLeft,
      order_flow: order_flow,
      order_list: order_list
    });
  }
});
