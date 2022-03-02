<template>
  <view class="cart-item">
    <view class="title-wrap">
      <view class="title-text">{{ orderItem.stateTitle }}</view>
    </view>
    <goodItemContent :orderItem='orderItem'
                     @gotoPage='gotoOrderDetail'></goodItemContent>
    <view class="btn-groups ">
      <view class="btn border-btn">取消订单</view>
      <view class="btn bg-btn">立即付款</view>
    </view>
  </view>
</template>
<script>
import goodItemContent from './good-item-content'
export default {
  name: 'orderItem',
  components: {
    'good-item-content': goodItemContent,
  },
  props: {
    orderItem: {
      type: Object,
      default: {}, //none |text| all | element
    },
  },
  watch: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    gotoOrderDetail() {
      uni.navigateTo({
        url: '/pages/home/orderDetail',
      })
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
.no-btn {
  padding-bottom: 34rpx;
}
.cart-item {
  padding: 0 28rpx 0 28rpx;
  background-color: #fff;
  margin-bottom: 13rpx;
  .title-wrap {
    //   height: 72rpx;
    padding-top: 22rpx;
    padding-bottom: 22rpx;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: flex-end;
    padding-right: 10rpx;
    .title-text {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #252525;
    }
  }
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
}
.btn-groups {
  border-top: 1px solid #e8e8e8;
  display: flex;
  margin-top: 26rpx;
  justify-content: flex-end;
  padding-top: 19rpx;
  padding-bottom: 19rpx;
  padding-right: 10rpx;
  .btn {
    width: 143rpx;
    height: 56rpx;
    border-radius: 5rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    text-align: center;
    line-height: 56rpx;
  }
  .border-btn {
    color: #8b8b8b;
    border: 1px solid #8b8b8b;
    margin-right: 36rpx;
  }
  .bg-btn {
    color: #ffffff;

    background: #63baa6;
  }
}
</style>