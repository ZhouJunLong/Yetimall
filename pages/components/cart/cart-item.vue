<template>
  <view class="cart-item">
    <view class="title-wrap">
      <view class="title-left">
        <view @click="selectItem">
          <image class="title-icon"
                 v-if="!isSelected"
                 :src="local_url+'home/no-selected-icon.png'"></image>
          <image class="title-icon"
                 v-else
                 :src="local_url+'home/selected-icon.png'"></image>
        </view>
        <view class="title-text">bigpop平台直邮</view>
      </view>
      <view class="title-right"
            @click="deleteItem">删除</view>
    </view>
    <view class="item-con"
          @click="gotoGoodsDetail">
      <view class="good_item">
        <image class="good_item_pic"
               src="../../../static/temp/rank-shop.png"></image>
        <view class="good_item_right">
          <view class="good_item_title">{{ cartItem.goodsName }}</view>
          <view class="good_item_des">
            <view class="good_item_des_spec">{{ cartItem.property  || '默认' }}</view>
            <view class="good_item_num">数量：x{{ cartItem.goodsCount }}</view>
          </view>
          <view class="item-bottom">
            <view class="good_item_price">
              <text class="good_item_price_type">¥</text>
              <text class="good_item_price_num">{{ cartItem.price }}</text>
            </view>
            <view class="edit-num">
              <view class="edit-btn"
                    @click.stop="changeCount(1)">-</view>
              <text class="edit-text">{{ cartItem.goodsCount }}</text>
              <view class="edit-btn"
                    @click.stop="changeCount(2)">+</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import CONFIG from '@common/config.js'

export default {
  name: 'cartItem',
  props: {
    cartItem: {
      type: Object,
      default: {}, //none |text| all | element
    },
  },
  watch: {
    cartItem(newVal) {
      this.isSelected = newVal.selected
    },
  },
  data() {
    return {
      isSelected: false,
      local_url: CONFIG.LOACL_URL,
    }
  },
  computed: {},
  methods: {
    gotoGoodsDetail() {
      uni.navigateTo({
        url: '/pages/home/goodsDeatil?id=' + this.cartItem.goodsId,
      })
    },
    selectItem() {
      // 请求接口 返回成功后才赋值
      this.isSelected = !this.isSelected
      this.$emit('selectedItem', this.cartItem.id)
    },
    /**
     * type 1减少  2增加
     */
    changeCount(type) {
      let count = this.cartItem.goodsCount
      if (type === 1) {
        count = count - 1 > 1 ? count - 1 : 1
      } else {
        count = count + 1
      }
      // 请求接口 返回成功后才赋值
      this.$emit('changeCartData', this.cartItem.id, count)
    },
    deleteItem() {
      //弹框提示
      uni.showModal({
        title: '提示',
        content: '是否删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#666666',
        confirmText: '确定',
        confirmColor: '#57D0D9',
        success: (res) => {
          if (res.confirm) {
            this.$emit('delGoodsCart', [this.cartItem.id])
          } else if (res.cancel) {
          }
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.cart-item {
  padding: 0 28rpx 34rpx 28rpx;
  background-color: #fff;
  margin-bottom: 13rpx;
  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //   height: 72rpx;
    padding-top: 22rpx;
    padding-bottom: 22rpx;
    border-bottom: 1px solid #e8e8e8;
    .title-left {
      display: flex;
      align-items: center;
      .title-icon {
        width: 28rpx;
        height: 28rpx;
        margin-right: 11rpx;
      }
      .title-text {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #252525;
      }
    }
    .title-right {
      width: 60px;
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #0183fc;
      text-align: right;
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
              line-height: 42rpx;
              min-width: 40rpx;
            }
          }
        }
      }
    }
  }
}
</style>