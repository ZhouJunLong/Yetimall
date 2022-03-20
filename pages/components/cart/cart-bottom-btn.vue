<template>
  <view class="bottom">
    <view class="bottom-select"
          @click="selectAll">
      <image class="title-icon"
             v-if="!isSelectedAll"
             src='../../../static/images/home/no-selected-icon.png'></image>
      <image class="title-icon"
             v-else
             src='../../../static/images/home/selected-icon.png'></image>
      <view class="select-text">全选</view>
    </view>
    <view class="bottom-right">
      <view class="bottom-info"
            v-if="!isDelete">
        <view class="info-top">
          <view class="info-top-txt">共{{ goods_counts }}件 | 合计：</view>
          <view class="info-top-price">
            <view class="price-icon">¥</view>
            <view class="price-num">{{ totalPrice }}</view>
          </view>
        </view>
        <view class="info-bottom">优惠：¥{{pricePreferential}}</view>
      </view>
      <view class="btn btn-bg"
            @click="submitOrder">{{ btnText }}</view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'cartBottomBtn',
  props: {
    isDelete: {
      type: Boolean,
      default: false,
    },
    totalCartInfo: {
      type: Object,
      default: {
        totalPrice: 0,
        totalCount: 0,
      },
    },
    pricePreferential: {
      type: Number,
      default: 0,
    },
    goods_counts: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    isSelectedAll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnText() {
      return this.isDelete ? '删除商品' : '立即结算'
    },
  },
  methods: {
    selectAll() {
      this.$emit('selectAll', !this.isSelectedAll)
    },
    submitOrder() {
      this.$emit('submitOrder')
    },
  },
}
</script>
<style lang="scss" scoped>
.bottom {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 19rpx 31rpx 19rpx 28rpx;
  font-family: PingFang SC;
  color: #252525;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottom-select {
    display: flex;
    align-items: center;
    .title-icon {
      width: 28rpx;
      height: 28rpx;
      margin-right: 11rpx;
    }
    .select-text {
      font-size: 24rpx;
    }
  }
  .bottom-right {
    display: flex;
    .bottom-info {
      .info-top {
        display: flex;
        .info-top-txt {
          font-size: 22rpx;
        }
        .info-top-price {
          display: flex;
          .price-icon {
            font-size: 24rpx;
            font-weight: bold;
            color: #ff2442;
          }
          .price-num {
            font-size: 32rpx;
            font-family: Helvetica Neue LT;
            font-weight: bold;
            color: #ff2442;
            line-height: 30rpx;
          }
        }
      }
      .info-bottom {
        font-size: 22rpx;
      }
    }
    .btn {
      width: 238rpx;
      height: 70rpx;

      border-radius: 5rpx;
      line-height: 70rpx;
      text-align: center;
      font-size: 26rpx;
      font-weight: bold;
      color: #ffffff;
      margin-left: 29rpx;
    }
    .btn-bg {
      background: #0183fc;
    }
  }
}
</style>