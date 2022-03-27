<template>

  <view class="item"
        @click="selectCoupon">
    <image class="item-bg"
           v-if="couponItem.isAble"
           src='../../../static/images/user/coupon-bg1.png'></image>
    <image class="item-bg"
           v-else
           src='../../../static/images/user/coupon-bg2.png'></image>
    <view class="item-con">
      <view class="item-top">
        <view class="top-left">
          <view class="title">{{ couponItem.name }}</view>
          <view class="des"
                v-if="couponItem.isAble">
            <text>消费满</text>
            <text class="des-red">{{ couponItem.amountMin || couponItem.amount }}元</text>
            <text>可以用</text>
          </view>
          <view class="des"
                v-else>
            <text>{{ couponItem.reason }}</text>
          </view>
        </view>
        <view class="top-right"
              v-if="couponItem.isAble">
          <view class="price">
            <view class="price-num">{{ couponItem.amount }}</view>
            <view class="price-icon">元</view>
          </view>
          <image class="selected"
                 v-if="isSelected || couponId == couponItem.id"
                 :src="local_url+'home/selected-icon.png'"></image>
          <image class="selected"
                 v-if="!isSelected"
                 :src="local_url+'home/no-selected-icon.png'"></image>
        </view>
      </view>
      <view class="item-bottom">
        {{ couponItem.expireDateText }}
      </view>
    </view>
  </view>

</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CONFIG from '@common/config.js'
export default {
  name: 'couponItem',
  props: {
    couponItem: {
      type: Object,
      default: {}, //none |text| all | element
    },
    amount: {
      type: Number,
      default: 0,
    },
    couponId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isSelected: false,
      local_url: CONFIG.LOACL_URL,
    }
  },
  methods: {
    ...mapMutations(['setStateByKey']),
    selectCoupon() {
      if (this.couponItem.isAble) {
        this.isSelected = true
        this.setStateByKey({
          currentCouponInfo: this.couponItem,
        })
        this.$emit('selectCoupon', this.couponItem.id)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.item {
  margin-top: 22rpx;
  position: relative;
  width: 100%;
  height: 223rpx;
  .item-bg {
    position: absolute;
    width: 100%;
    height: 223rpx;
    left: 0;
    top: 0;
  }
  .item-con {
    position: absolute;
    width: 686rpx;
    height: 223rpx;
    left: 0;
    top: 0;
    padding-left: 33rpx;
    padding-right: 25rpx;
    padding-top: 20rpx;
    font-family: PingFang SC;
    color: #252525;
    box-sizing: border-box;
    .item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .top-left {
        .title {
          font-size: 32rpx;
          font-weight: bold;
        }
        .des {
          font-size: 24rpx;
          font-weight: bold;
          color: #8b8b8b;
        }
        .des-red {
          color: #ff2442;
        }
      }
      .top-right {
        display: flex;
        align-items: center;
        .price {
          display: flex;
          align-items: flex-end;
          font-weight: bold;
          color: #ff2442;
          .price-num {
            font-size: 70rpx;
          }
          .price-icon {
            line-height: 70rpx;
            font-size: 28rpx;
          }
          margin-right: 35rpx;
        }
        .selected {
          width: 28rpx;
          height: 29rpx;
        }
      }
    }
    .item-bottom {
      margin-top: 50rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: #8b8b8b;
    }
  }
}
</style>