<template>
  <view class="goods-item"
        @click="gotoDetail">
    <image class="item-img"
           :src="goodItem.imgUrl || '../../static/temp/shop-good.png'"></image>
    <view class="item-title">{{ goodItem.name || 'YSL圣罗兰 玫瑰金小粉条口红 #214' }}</view>
    <view class="item-bottom">
      <view class="item-bottom-price">
        <text class="price-icon">¥</text>
        <text class="price-num">{{ goodItem.price || 218}}</text>
      </view>
      <view class="item-bottom-sale">{{ goodItem.saleQuantity || 796 }}人付款</view>
    </view>
  </view>
</template>
<script>
import { interceptTap } from '@common/utils.js'
export default {
  name: 'goosCard',
  props: {
    goodItem: {
      type: Object,
      value: {},
    },
  },
  methods: {
    gotoDetail() {
      if (!interceptTap()) return
      uni.navigateTo({
        url: '/pages/home/goodsDeatil?id=' + this.goodItem.id,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.goods-item {
  margin-top: 8rpx;
  margin-left: 8rpx;
  width: 362rpx;
  color: #252525;
  background-color: #fff;
  .item-img {
    width: 100%;
    height: 339rpx;
  }
  .item-title {
    font-size: 24rpx;
    font-family: PingFang-SC-Medium, PingFang-SC;
    min-height: 50rpx;
    padding: 0 16rpx;
  }
  .item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16rpx 25rpx;
    margin-top: 39rpx;
    .item-bottom-price {
      .price-icon {
        font-size: 24rpx;
        font-weight: 800;
      }
      .price-num {
        font-size: 32rpx;
      }
    }
    .item-bottom-sale {
      color: #8b8b8b;
      font-size: 22rpx;
    }
  }
}
</style>