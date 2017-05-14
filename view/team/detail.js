const china = require("../../util/china.js");
const constant = require("../../util/constant.js");
const http = require('../../util/http.js');
const util = require('../../util/util.js');

Page({
  data: {
    color: constant.color,
    is_load: false,
    member_id: '',
    member_name: '',
    user_avatar: '',
    member_level_id: '',
    member_month_order_amount: 0,
    member_all_order_amount: 0,
    member_status: false,
    order_list: [],
    member_level_list: []
  },
  onUnload: function () {

  },
  onLoad: function (option) {
    this.setData({
      // member_id: option.member_id
      member_id: 'e63b4b8616cc4c3ab1207806d24fb825'
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
      url: '/order/team/find',
      data: {
        member_id: this.data.member_id,
      },
      success: function (data) {
        for (var i = 0; i < data.order_list.length; i++) {
          for (var j = 0; j < data.order_list[i].product_list.length; j++) {
            data.order_list[i].product_list[j].product_image_file = constant.host + data.order_list[i].product_list[j].product_image_file;
          }
        }

        this.setData({
          is_load: true,
          member_name: data.member_name,
          user_avatar: data.user_avatar,
          member_level_id: data.member_level_id,
          member_month_order_amount: data.member_month_order_amount,
          member_all_order_amount: data.member_all_order_amount,
          member_status: data.member_status,
          order_list: data.order_list,
          member_level_list: data.member_level_list
        });
      }.bind(this)
    });
  },
  handleRadioChange: function (event) {
    this.setData({
      member_level_id: event.detail.value
    });
  },
  handleSubmit: function () {
    if (this.data.member_level_id == '') {
      util.showFailToast({
        title: '请选择会员等级'
      });

      return;
    }

    http.request({
      url: '/member/children/update',
      data: {
        member_id: this.data.member_id,
        member_level_id: this.data.member_level_id
      },
      success: function (data) {
        util.showSuccessToast({
          title: '提交成功',
          success: function () {
            wx.navigateBack();
          }
        });
      }.bind(this)
    });
  }
});
