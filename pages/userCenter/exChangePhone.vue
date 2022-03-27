<template>
  <view class="container">
    <view class="bind">
      <view class="bind-left">
        <view class="title">绑定手机</view>
        <view class="phone">{{ phone }}</view>
      </view>
      <view class="right">
        <view class="text">更换号码</view>
        <image class="arrow"
               :src="local_url+'home/arrow-right.png'"></image>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CONFIG from '@common/config.js'

export default {
  data() {
    return {
      phone: '',
      local_url: CONFIG.LOACL_URL,
    }
  },
  onLoad() {
    //   这里其实应该从userInfo中取
    const userInfo = uni.getStorageSync('userInfo')
    this.phone = userInfo.phone
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.container {
  .bind {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang SC;
    font-weight: 500;
    padding: 55rpx 35rpx;
    background-color: #fff;
    .bind-left {
      font-size: 26rpx;
      color: #252525;
      .title {
      }
      .phone {
        margin-top: 28rpx;
      }
    }
    .right {
      font-size: 24rpx;
      color: #8b8b8b;
      display: flex;
      align-items: center;

      .text {
      }
      .arrow {
        width: 15rpx;
        height: 15rpx;
        margin-left: 19rpx;
      }
    }
  }
}
</style>>
