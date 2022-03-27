<template>
  <view class="container">
    <view class="result">
      <image class="pic"
             :src="local_url+'home/pay-success.png'"></image>
      <view class="result-text">支付成功</view>
      <view class="btn-groups">
        <view class="btn border-btn"
              @click="gotoHome">继续逛逛</view>
        <view class="btn bg-btn"
              @click="gotoOrderDetail">查看订单</view>
      </view>
    </view>
    <view class="recommed">
      <view class="recommed-title">更多商品推荐</view>
      <view class="shop-goods">
        <good-card v-for="(item,index) in 10"
                   :key="index"></good-card>
      </view>
    </view>
  </view>
</template>
<script>
import goodCard from '../components/goods-card.vue'
import CONFIG from '@common/config.js'

export default {
  data() {
    return {
      local_url: CONFIG.LOACL_URL,
    }
  },
  components: {
    'good-card': goodCard,
  },
  onLoad(options) {
    this.oid = options.oid
  },
  methods: {
    gotoHome() {
      uni.switchTab({
        url: '/pages/home/home',
      })
    },
    gotoOrderDetail() {
      uni.navigateTo({
        url: '/pages/home/orderDetail?oid=' + this.oid,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  .result {
    background-color: #fff;
    padding-top: 68rpx;
    padding-bottom: 70rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pic {
      width: 273rpx;
      height: 230rpx;
    }
    .result-text {
      margin-top: 2rpx;
      font-size: 38rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #0183fc;
    }
    .btn-groups {
      display: flex;
      margin-top: 44rpx;
      .btn {
        width: 234rpx;
        height: 70rpx;

        border-radius: 5rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        text-align: center;
        line-height: 70rpx;
      }
      .border-btn {
        color: #8b8b8b;
        border: 1px solid #8b8b8b;
        margin-right: 36rpx;
      }
      .bg-btn {
        color: #ffffff;

        background: #0183fc;
      }
    }
  }
  .recommed {
    .recommed-title {
      padding-left: 36rpx;
      background-color: #fff;
      height: 113rpx;
      line-height: 113rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #252525;
    }
    .shop-goods {
      //   padding-left: 8rpx;
      padding-right: 8rpx;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>