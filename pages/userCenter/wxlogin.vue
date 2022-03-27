<template>
  <view class="wrap">
    <view class="login-image">
      <image mode="widthFix"
             src="../../static/images/user/weixin_logo.png" />
    </view>
    <view class="login-info">
      <view class="login-title">微信授权登录</view>
      <view class="login-tip">本小程序需要您授权登录才能使用相关功能</view>
    </view>
    <view class="login-btn">
      <button @click="getUserProfile">登录</button>
    </view>
  </view>
</template>

<script>
import CONFIG from '../../common/config.js'
import tools from '../../common/tools.js'
import { WXlogin } from '@common/utils.js'

var base_url = CONFIG.BASE_URL
var canClick = 1

export default {
  data() {
    return {}
  },
  onLoad(options) {
    var that = this
  },
  methods: {
    //登录
    getUserProfile() {
      //判断用户是否授权
      //   var userInfo = uni.getStorageSync('userInfo')
      //   var did = uni.getStorageSync('did')
      uni.getUserProfile({
        desc: '用于获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: function (res) {
          let userInfo = res.userInfo //用户信息对象
          console.log('---userInfo---', userInfo)
          WXlogin(userInfo)
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  padding: 100rpx 0rpx;
}
.login-image {
  text-align: center;
}
.login-image image {
  width: 200rpx;
  margin: auto;
}
.login-info {
  padding-top: 30rpx;
  text-align: center;
}
.login-title {
  font-size: 34rpx;
  padding: 30rpx 0rpx;
}
.login-tip {
  padding: 0rpx 0rpx;
  color: #999999;
  font-size: 30rpx;
}
.login-btn {
  width: 100%;
  margin-top: 50rpx;
}
.login-btn button {
  margin: 0rpx 50rpx;
  background: #02bb00;
  color: #ffffff;
  line-height: 2.5;
  font-size: 34rpx;
  border-radius: 8rpx;
}
</style>
