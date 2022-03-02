<template>

  <view class="item-con"
        @click="gotoPage">
    <view class="good_item"
          :style="style">
      <image class="good_item_pic"
             src="../../../static/temp/rank-shop.png"></image>
      <view class="good_item_right">
        <view class="good_item_title">{{ orderItem.goods_name }}</view>
        <view class="good_item_des">
          <view class="good_item_des_spec">{{ orderItem.property && orderItem.property[0].value || '默认' }}</view>
          <view class="good_item_num">数量：x{{ orderItem.count }}</view>
        </view>
        <view class="item-bottom">
          <view class="good_item_price">
            <text class="good_item_price_type">¥</text>
            <text class="good_item_price_num">{{ orderItem.price }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>
<script>
export default {
  name: 'orderItem',
  props: {
    orderItem: {
      type: Object,
      default: {}, //none |text| all | element
    },
    style: {
      type: String,
      default: '',
    },
  },
  watch: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    gotoPage() {
      this.$emit('gotoPage')
    },
    selectItem() {
      // 请求接口 返回成功后才赋值
      this.isSelected = !this.isSelected
      this.$emit('selectedItem', this.orderItem.id)
    },
    /**
     * type 1减少  2增加
     */
    changeCount(type) {
      let count = this.orderItem.count
      if (type === 1) {
        count = count - 1 > 1 ? count - 1 : 1
      } else {
        count = count + 1
      }
      // 请求接口 返回成功后才赋值
      this.$emit('changeCartData', this.orderItem.id, count)
    },
  },
}
</script>
<style lang="scss" scoped>
.item-con {
  .good_item {
    margin-top: 39rpx;
    display: flex;
    .good_item_pic {
      width: 158rpx;
      height: 158rpx;
      margin-right: 28rpx;
    }
    .good_item_right {
      flex: 1;
      .good_item_title {
        font-size: 24rpx;
        color: #252525;
        line-height: 32rpx;
      }
      .good_item_des {
        margin-top: 12rpx;
        margin-bottom: 12rpx;
        display: flex;
        font-size: 22rpx;
        color: #252525;
        line-height: 32rpx;
        .good_item_des_spec {
          margin-right: 10rpx;
        }
      }
      .item-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .good_item_price {
          color: #252525;
          font-weight: bold;
          .good_item_price_type {
            font-size: 24rpx;
            font-weight: 800;
            line-height: 24rpx;
          }
          .good_item_price_num {
            font-size: 28rpx;
            line-height: 28rpx;
          }
        }
        .edit-num {
          display: flex;
          align-items: center;
          height: 42rpx;
          border: 1px solid #979080;
          border-radius: 5rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #252525;
          line-height: 42rpx;
          .edit-btn {
            width: 42rpx;
            height: 42rpx;
            line-height: 42rpx;
            text-align: center;
            font-size: 32rpx;
          }
          .edit-text {
            font-size: 28rpx;
            text-align: center;

            min-width: 40rpx;
          }
        }
      }
    }
  }
}
</style>