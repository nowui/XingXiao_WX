const notification = require('../../util/notification.js');
const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
  data: {
    window_width: getApp().globalData.window_width,
    slider_offset: 0,
    slider_left: 0,
    slider_width: 0,
    express_id: '',
    express: {
      express_trace: []
    },
    list: []
  },
  onUnload: function () {

  },
  onLoad: function (option) {
    this.handleLoad(option.order_id);
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
  handleLoad: function (order_id) {
    http.request({
      url: '/express/list',
      data: {
        order_id: order_id
      },
      success: function (data) {
        var slider_width = this.data.window_width / data.length;
        var express_id = '';
        var express = {};

        for (var i = 0; i < data.length; i++) {
          data[i].express_trace = JSON.parse(data[i].express_trace);
        }

        if (data.length > 0) {
          express = data[0];
        }

        this.setData({
          slider_left: 0,
          slider_offset: slider_width * 0,
          slider_width: slider_width,
          express_id: express_id,
          express: express,
          list: data
        });
      }.bind(this)
    });
  },
  handleTab: function (event) {
    var express_id = event.currentTarget.id;
    var express = {};

    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].express_id == express_id) {
        express = this.data[i];
      }
    }

    this.setData({
      slider_offset: event.currentTarget.offsetLeft,
      express_id: express_id,
      express: express
    });
  }
});
