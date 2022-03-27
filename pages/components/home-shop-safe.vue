<template>
  <view class="shop-top">
    <view class="shop-top-left">
      <image class="shop-logo"
             src="../../static/images/home/home-shop-logo.png"></image>
      <image class="shop-title"
             :src="local_url+'home/home-shop-title.png'"></image>
    </view>
    <view class="shop-top-right">价格优惠·正品保障·明星同款</view>
  </view>
</template>
<script>
import CONFIG from '@common/config.js'

export default {
  name: 'home-shop-safe',
  data() {
    return {
      local_url: CONFIG.LOACL_URL,
    }
  },
}
</script>
<style lang="scss" scoped>
.shop-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76rpx;
  padding-left: 24rpx;
  padding-right: 30rpx;
  .shop-top-left {
    display: flex;
    align-items: center;
    .shop-logo {
      width: 48rpx;
      height: 41rpx;
    }
    .shop-title {
      margin-left: 11rpx;
      width: 152rpx;
      height: 30rpx;
    }
  }
  .shop-top-right {
    font-size: 24rpx;
    font-family: PingFang-SC-Medium, PingFang-SC;
    color: #252525;
  }
}
</style>