<template>
  <view class="celebrity-shop">
    <view class="shop-header">
      <image class="header-bg"
             src="../../static/temp/shop-celebrity.png">
      </image>
      <view class="header-icon">
        <image class="icon-img"
               src="../../static/temp/shop-celebrity-icon.png"></image>
      </view>
      <view class="header-back"
            v-if="showBack"
            @click="goback">
        <image class="back-img"
               src="../../static/images/home/back.png"></image>
      </view>
    </view>
    <view class="shop-container">
      <view class="container-center">
        <view class="center-header">
          <view class="header-left">
            <image class="header-left-icon"
                   src="../../static/temp/shop-celebrity-icon.png"></image>
            <view class="header-left-info">
              <view class="info-title">林允儿周边</view>
              <view class="info-bottom">
                7982人关注·12款商品
              </view>
            </view>
          </view>
          <view class="header-right">
            <image class="header-right-icon"
                   src='../../static/images/home/follow-selected.png'></image>
            <text class="header-right-text">已关注</text>
          </view>
        </view>
        <view class="center-banner">
          <image class="banner"
                 src='../../static/temp/shop-celebrity-banner.png'></image>
        </view>
      </view>
      <!-- 商品列表 -->
      <view class="shop-goods">
        <good-card v-for="(item,index) in 10"
                   :key="index"></good-card>
      </view>
    </view>
  </view>
</template>
<script>
import goodCard from '../components/goods-card.vue'

export default {
  data() {
    return {
      showBack: true,
    }
  },
  components: {
    'good-card': goodCard,
  },
  onLoad(query) {
    if (query.back && query.back === 1) {
      this.showBack = true
    }
  },
  methods: {
    goback() {
      uni.navigateBack({
        delta: 1,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.celebrity-shop {
  .shop-header {
    position: relative;
    z-index: 1;
    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 445rpx;
    }
    .header-icon {
      position: absolute;
      background: #0183fc;
      border: 2rpx solid #0183fc;
      width: 64rpx;
      height: 64rpx;
      opacity: 0.54;
      right: 28rpx;
      top: 128rpx;
      border-radius: 50%;
      overflow: hidden;
      .icon-img {
        width: 64rpx;
        height: 64rpx;
      }
    }
    .header-back {
      left: 31rpx;
      position: absolute;
      top: 60rpx;
      .back-img {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .shop-container {
    z-index: 2;
    position: relative;
    top: 445rpx;
    .container-center {
      background-color: #fff;
      width: 100%;
      height: 354rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .center-header {
        // margin-left: 17rpx;
        // margin-right: 17rpx;
        box-sizing: border-box;
        box-shadow: 0px 1px 8rpx 0px rgba(139, 139, 139, 1);
        border-radius: 5rpx 5rpx 5rpx 5rpx;
        padding: 27rpx 19rpx;
        width: 716rpx;
        background-color: #fff;
        margin-top: -19rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header-left {
          display: flex;
          align-items: center;
          .header-left-icon {
            width: 78rpx;
            height: 78rpx;
            border-radius: 50%;
            margin-right: 16rpx;
          }
          .header-left-info {
            .info-title {
              font-size: 24rpx;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: #252525;
            }
            .info-bottom {
              font-size: 22rpx;
              font-family: PingFang-SC-Medium, PingFang-SC;
              font-weight: 500;
              color: #8b8b8b;
            }
          }
        }
        .header-right {
          width: 126rpx;
          height: 52rpx;
          //   background: #0183FC;
          border-radius: 5rpx 5rpx 5rpx 5rpx;
          border: 1px solid #0183fc;
          display: flex;
          align-items: center;
          justify-content: center;
          .header-right-icon {
            width: 24rpx;
            height: 22rpx;
          }
          .header-right-text {
            font-size: 24rpx;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #0183fc;
          }
        }
      }
      .center-banner {
        width: 716rpx;
        height: 180rpx;
        margin-top: 28rpx;
        .banner {
          width: 100%;
          height: 100%;
        }
      }
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