<template>

  <view class="item"
        @click="selectCoupon">
    <image class="item-bg"
           src='../../../static/images/user/coupon-bg1.png'></image>
    <view class="item-con">
      <view class="item-top">
        <view class="top-left">
          <view class="title">满减优惠券</view>
          <view class="des">
            <text>消费满</text>
            <text class="des-red">300元</text>
            <text>可以用</text>
          </view>
        </view>
        <view class="top-right">
          <view class="price">
            <view class="price-num">5</view>
            <view class="price-icon">元</view>
          </view>
          <image class="selected"
                 v-if="true"
                 src='../../../static/images/home/no-selected-icon.png'></image>
          <image class="selected"
                 v-else
                 src='../../../static/images/home/selected-icon.png'></image>
        </view>
      </view>
      <view class="item-bottom">
        有效期至2019-07-07 18:50:00
      </view>
    </view>
  </view>

</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

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
  },
  methods: {
    ...mapMutations(['setStateByKey']),
    selectCoupon() {
      let date = new Date()
      let isExpired =
        date <= this.couponItem.expireDateEnd &&
        date >= this.couponItem.expireDateStart
      let isUse = this.couponItem.isUse === 1 ? true : false
      if (
        this.couponItem &&
        this.amount >= this.couponItem.amountMin &&
        isExpired &&
        isUse
      ) {
        this.setStateByKey('currentCouponInfo', this.couponItem)
        this.$emit('selectCoupon')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.item {
  margin-top: 22rpx;
  position: relative;
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