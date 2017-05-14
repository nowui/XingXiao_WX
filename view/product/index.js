const constant = require("../../util/constant.js");
const notification = require('../../util/notification.js');
const storage = require("../../util/storage.js");
const http = require("../../util/http.js");
const wechat = require("../../util/wechat.js");
const util = require("../../util/util.js");
const Quantity = require('../../component/quantity/index');
const htmlToWxml = require('../../util/htmlToWxml.js');

Page(Object.assign({}, Quantity, {
  data: {
    is_load: false,
    product_quantity: {
      quantity: 1,
      min: 1,
      max: 99999
    },
    product_total: 0,
    window_width: getApp().globalData.window_width,
    tab_index: 0,
    slider_offset: 0,
    slider_left: 0,
    slider_width: 0,
    product_is_pay: false,
    sku_id: '',
    product_id: '0551169341324bd2a72d77ff84857922',
    product_name: '',
    product_price: 0,
    product_image_file: '',
    product_image_file_list: [],
    product_content: [],
    cart_count: []
  },
  onUnload: function () {

  },
  onLoad: function (option) {

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
  handleZanQuantityChange(event) {
    var componentId = event.componentId;
    var product_quantity = event.quantity;

    var product_total = 0;

    product_total = this.data.product_price * product_quantity;

    this.setData({
      product_total: product_total,
      [`${componentId}.quantity`]: product_quantity
    });
  },
  handleImageLoad: function (event) {
    var width = event.detail.width;
    var height = event.detail.height;
    var index = event.currentTarget.dataset.index;
    this.data.product_content[index].attr.height = (height / width) * getApp().globalData.window_width;
    this.setData({
      product_content: this.data.product_content
    });
  },
  handleLoad: function () {
    http.request({
      url: '/xingxiao/product/find',
      data: {
        product_id: this.data.product_id
      },
      success: function (data) {
        data.product_image_file = constant.host + data.product_image_file;

        var product_quantity_min = data.product_quantity_min;
        var product_price = JSON.parse(data.sku_list[0].product_price);
        var product_total = 0;

        product_total = product_price[0].product_price * product_quantity_min;

        this.setData({
          is_load: true,
          product_quantity: {
            quantity: data.product_quantity_min,
            min: data.product_quantity_min
          },
          product_total: product_total.toFixed(2),
          product_is_pay: data.product_is_pay,
          sku_id: data.sku_list[0].sku_id,
          product_id: data.product_id,
          product_name: data.product_name,
          product_price: JSON.parse(data.sku_list[0].product_price)[0].product_price.toFixed(2),
          product_image_file: data.product_image_file,
          product_image_file_list: data.product_image_file_list,
          product_content: htmlToWxml.html2json(data.product_content)
        });
      }.bind(this)
    });

    this.setData({
      slider_left: 0,
      slider_offset: this.data.window_width / 2 * this.data.tab_index,
      slider_width: this.data.window_width / 2
    });
  },
  handleBuy: function () {
    if (this.data.product_id == '') {
      return;
    }

    var product_list = [{
      sku_id: this.data.sku_id,
      product_id: this.data.product_id,
      product_name: this.data.product_name,
      product_image_file: constant.host + this.data.product_image_file,
      product_price: this.data.product_price,
      product_quantity: this.data.product_quantity.quantity,
      product_stock: this.data.product_quantity.max
    }]

    http.request({
      url: '/order/save',
      data: {
        order_delivery_name: '',
        order_delivery_phone: '',
        order_delivery_address: '',
        order_message: '',
        order_pay_type: 'WECHAT_PAY',
        product_list: product_list,
        open_id: storage.getOpenId(),
        pay_type: 'WX'
      },
      success: function (data) {
        var order_id = data.orderId;

        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          appId: constant.app_id,
          success: function (response) {
            wx.redirectTo({
              url: '/view/order/result?order_id=' + order_id
            });
          },
          fail: function (response) {
            wx.redirectTo({
              url: '/view/order/index?order_flow=ALL'
            });
          }
        })
      }.bind(this)
    });
  }
}));