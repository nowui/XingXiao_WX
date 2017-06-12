const constant = require("../../util/constant.js");
const storage = require("../../util/storage.js");
const http = require("../../util/http.js");
const wechat = require("../../util/wechat.js");

Page({
    data: {
        color: constant.color,
        is_load: false,
        user_name: '',
        user_avatar: '',
        member_level_id: '',
        member_level_name: '',
        member_level_value: 999,
        member_commission_amount: 0,
        member_order_amount: 0,
        member_wait_pay: 0,
        member_wait_send: 0,
        member_wait_receive: 0,
        member_status: false
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
            is_toast: !this.data.is_load,
            url: '/member/my/find',
            data: {},
            success: function (data) {
                this.setData({
                    is_load: true,
                    user_name: data.user_name,
                    user_avatar: data.user_avatar,
                    member_level_id: data.member_level_id,
                    member_level_name: data.member_level_name,
                    member_level_value: data.member_level_value,
                    member_commission_amount: data.member_commission_amount.toFixed(2),
                    member_order_amount: data.member_order_amount.toFixed(2),
                    member_wait_pay: data.member_wait_pay,
                    member_wait_send: data.member_wait_send,
                    member_wait_receive: data.member_wait_receive,
                    member_status: data.member_status
                });
            }.bind(this)
        });
    }
});
