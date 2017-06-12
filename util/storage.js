const constant = require("./constant.js");

const opoen_id_key = ('opoen_id_' + constant.version);
const token_key = ('token_' + constant.version);
const product_key = ('product_' + constant.version);
const cart_key = ('cart_' + constant.version);
const member_key = ('member_' + constant.version);

function getIsLanuch() {
  var is_lanuch = wx.getStorageSync('is_lanuch');

  if (is_lanuch == "") {
    return false;
  }

  return is_lanuch;
}

function setIsLanuch() {
  wx.setStorageSync('is_lanuch', true);
}

function getOpenId() {
  return wx.getStorageSync(opoen_id_key);
}

function setOpenId(opoen_id) {
  wx.setStorageSync(opoen_id_key, opoen_id);
}

function getToken() {
  return 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0OTY1MjAxNzAsImV4cCI6NDY1MjE5Mzc3MCwiYXV0aG9yaXphdGlvbl9pZCI6ImE0N2U4ZTMzMGRkYjQ5MGJhMDdkZGUxZGY5NTM4ZTg3IiwidXNlcl9pZCI6IjUxOWI3YWNhYjIzNzRmMTI5ZWY0ZGY1ZDRhYjNlYzI1In0.r-nt2tNL1FXG9t5f6QqnbtWDYYszh1qrxuCclxhggDOBChKuWw4jToEz5zB5Q-G5wevZg1VfU4SO17Xjth44ag';
  // return 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0OTU0Mjg4ODEsImV4cCI6MTUyNjk2NDg4MSwiYXV0aG9yaXphdGlvbl9pZCI6IjFhZTczMWFjZDE3MzRkMTFhZTI1M2VjNzJhYWVhY2YwIiwidXNlcl9pZCI6IjQwZDRmYTZlNGE3MzRkMzM4NjIzMzY2ZTQzNDViNzg0In0.KfE3zG-W4DCRSanwlMoMvF_d6jUcpCSIDbedPCa_QBVy3JY026GUFYMFtk_9GHlGqZA9-8k2kfR6RojfK_NTrQ';
  return wx.getStorageSync(token_key);
}

function setToken(token) {
  wx.setStorageSync(token_key, token);
}

function getProduct() {
  var product = wx.getStorageSync(product_key);

  if (product == "") {
    return [];
  }

  return JSON.parse(product);
}

function setProduct(product) {
  wx.setStorageSync(product_key, JSON.stringify(product));
}

function removeProduct() {
  wx.removeStorageSync(product_key);
}

function getCart() {
  var cart = wx.getStorageSync(cart_key);

  if (cart == '') {
    return [];
  }

  return JSON.parse(cart);
}

function setCart(cart) {
  wx.setStorageSync(cart_key, JSON.stringify(cart));
}

function addCart(product) {
  var cartList = getCart();
  var isNotExit = true;

  for (var i = 0; i < cartList.length; i++) {
    var cart = cartList[i];

    if (cart.product_id == product.product_id) {
      isNotExit = false;

      cart.sku_id = product.sku_id;
      cart.product_name = product.product_name;
      cart.product_image = product.product_image;
      cart.product_price = product.product_price;
      cart.product_quantity.quantity = product.product_quantity.quantity + cart.product_quantity.quantity;
      cart.product_stock = product.product_stock;
    }
  }

  if (isNotExit) {
    cartList.push(product);
  }

  wx.setStorageSync(cart_key, JSON.stringify(cartList));
}

function removeCart() {
  wx.removeStorageSync(cart_key);
}

function getMember() {
  var member = wx.getStorageSync(member_key);

  if (member == "") {
    return {
      user_name: '',
      user_avatar: '',
      member_level_id: '',
      member_level_value: 999
    };
  }

  return JSON.parse(member);
}

function setMember(member) {
  wx.setStorageSync(member_key, JSON.stringify(member));
}

module.exports = {
  getIsLanuch: getIsLanuch,
  setIsLanuch: setIsLanuch,
  getOpenId: getOpenId,
  setOpenId: setOpenId,
  getToken: getToken,
  setToken: setToken,
  getProduct: getProduct,
  setProduct: setProduct,
  removeProduct: removeProduct,
  getCart: getCart,
  setCart: setCart,
  addCart: addCart,
  removeCart: removeCart,
  getMember: getMember,
  setMember: setMember
};