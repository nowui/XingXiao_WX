const china = require("../../util/china.js");
const notification = require('../../util/notification.js');
const constant = require("../../util/constant.js");
const http = require('../../util/http.js');
const util = require('../../util/util.js');

Page({
  data: {
    color: constant.color,
    is_load: false,
    member_id: '',
    member_level_id: '',
    member_level_list: []
  },
  onUnload: function () {

  },
  onLoad: function (option) {
    this.setData({
      member_id: option.member_id
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
      url: '/member/team/member/level/list',
      data: {
        member_id: this.data.member_id,
      },
      success: function (data) {
        var member_level_id = '';
        for (var i = 0; i < data.length; i++) {
          if (data[i].is_select) {
            member_level_id = data[i].member_level_id;
          }
        }

        this.setData({
          is_load: true,
          member_level_id: member_level_id,
          member_level_list: data
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
      url: '/member/member/level/update',
      data: {
        member_id: this.data.member_id,
        member_level_id: this.data.member_level_id
      },
      success: function (data) {
        notification.emit('notification_team_detail_load', {});

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
