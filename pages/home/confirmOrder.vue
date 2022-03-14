<template>
  <view class="container">
    <view class="address">
      <view class="address-null"
            v-if="!hasAddress"
            @click="selectAddress">
        <view class="title">请填写收货地址</view>
        <image class="arrow"
               src="../../static/images/home/arrow-right.png"></image>
      </view>
      <view class="address-has"
            @click="selectAddress"
            v-else>
        <view class="address-top">
          <view class="top-btn"
                v-if="addressItem.isDefault">默认</view>
          <view class="top-des">{{ addressItem.address }}</view>
        </view>
        <view class="address-center">
          <view class="center-left">{{ addressItem.addressDetail }}</view>
          <image class="arrow"
                 src="../../static/images/home/arrow-right.png"></image>
        </view>
        <view class="address-des">
          <view class="name">{{ addressItem.name }}</view>
          <view class="phone">{{ addressItem.phone }}</view>
        </view>

      </view>
    </view>
    <view class="good-info">
      <view class="info-head">
        <view class="logo">YE</view>
        <view class="title">平台直邮</view>
        <view class="line"></view>
        <view class="time">约3天到货</view>
      </view>
      <view class="goods-detail"
            v-for="(item,index) in orderGoodsInfoVoList"
            :key="index">
        <view class="detail-left">
          <image class="detail-pic"
                 src="../../static/temp/shop-good.png"></image>
          <view class="detail-info">
            <view class="title">{{item.name}}</view>
            <view class="info">
              <view class="spec">{{item.property}}</view>
              <view class="num">数量 x{{ item.count}}</view>
            </view>
          </view>
        </view>
        <view class="price">
          <view class="price-icon">¥</view>
          <view class="price-num">{{ item.price }}</view>
        </view>
      </view>
      <view class="line line1"></view>
      <view class="discount">
        <view class="discount-item">
          <view class="item-left">
            <view class="title">折扣</view>
            <view class="des">限时折扣</view>
          </view>
          <view class="item-right">
            <view class="price">-¥15.00</view>
            <image class="arrow"
                   src="../../static/images/home/arrow-right.png"></image>
          </view>
        </view>
        <view class="discount-item">
          <view class="item-left">
            <view class="title">优惠券</view>
          </view>
          <view class="item-right item-quan">
            <view class="price">无可用优惠券</view>
            <image class="arrow"
                   src="../../static/images/home/arrow-right.png"></image>
          </view>
        </view>
      </view>
      <view class="line line2"></view>
      <view class="total">
        <view class="total-des"
              v-if="orderGoodsData.orderNum">共{{orderGoodsData.orderNum}}件 小计：</view>
        <view class="total-des"
              v-else>小计：</view>
        <view class="total-price">¥{{orderGoodsData.orderPricePay}}</view>
      </view>
    </view>
    <view class="statement">
      <view class="statement-item">
        <view class="title">平台声明</view>
        <view class="des">本平台不向未成年提供服务，未成年人需在征得监护人同意的前提下 使用本平台服务。</view>
      </view>
      <view class="statement-item">
        <view class="title">购买须知</view>
        <view class="des">预售定制类商品请谨慎下单，不支持七天无理由退换。港澳台用户需支付额外内地转收件地址的顺丰到付费用</view>
      </view>
    </view>
    <view class="bottom-btn"
          :style="safeBottom">
      <view class="bottom-left">
        <view class="bottom-left-top">
          <view v-if="orderGoodsData.orderNum"
                class="des">共{{orderGoodsData.orderNum}}件 | 合计：</view>
          <view class="des"
                v-else>合计：</view>
          <view class="price">
            <view class="price-icon">¥</view>
            <view class="price-num">{{orderGoodsData.orderPricePay}}</view>
          </view>
        </view>
        <view class="bottom-left-bottom">优惠：¥{{ orderGoodsData.orderPricePreferential || 0}}</view>
      </view>
      <view class="btn"
            @click="sumitOrder">提交订单</view>
    </view>
  </view>
</template>
<script>
import tools from '../../common/tools.js'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      safeBottom: '',
      addressItem: null,
      orderGoodsInfoVoList: [],
      orderGoodsData: null,
    }
  },
  async onLoad() {
    let safeBottom = tools.getSafeAreaBottom() + 20
    this.safeBottom = `padding-bottom:${safeBottom}rpx`

    let params = uni.getStorageSync('orderConfirmInfo')
    if (!params) return
    let orderData = await this.orderConfirm(params)
    if (orderData) {
      this.orderGoodsData = orderData
      this.orderGoodsInfoVoList = orderData.orderGoodsInfoVoList || []
    }
  },
  async onShow() {
    if (this.currentSelectedAddress) {
      this.addressItem = this.currentSelectedAddress
    } else {
      let res = await this.getAddressDefault()
      if (res) {
        this.addressItem = (res.list && res.list[0]) || null
      }
    }
  },
  computed: {
    ...mapState(['orderConfirmInfo', 'currentSelectedAddress']),
    hasAddress() {
      return this.addressItem
    },
  },
  methods: {
    ...mapActions(['getAddressDefault', 'orderConfirm', 'submitOrder']),
    ...mapMutations(['setStateByKey']),
    selectAddress() {
      uni.navigateTo({
        url: '/pages/home/addressList?cb=1',
      })
    },
    async sumitOrder() {
      if (!this.addressItem.id) {
        uni.showToast({
          title: '请选择地址',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      let orderGoodsList = []
      this.orderGoodsInfoVoList.forEach((item) => {
        let obj = {
          count: item.count || 1,
          id: item.id,
        }
        item.propertyId && (obj.goodsPropertyId = item.propertyId)
        orderGoodsList.push(obj)
      })
      let params = {
        addressId: this.addressItem.id,
        additionalOrderGoodsList: [],
        orderGoodsList: orderGoodsList,
        payTypeId: 1,
        couponId: 0,
        couponPrice: 0,
      }
      let res = await this.submitOrder(params)
      if (res) {
        uni.redirectTo({
          url: '/pages/home/paySuccess?oid=' + res.id,
        })
      }
    },
  },
  destroyed() {
    this.setStateByKey({
      orderConfirmInfo: null,
    })
  },
}
</script>
<style lang="scss" scoped>
.container {
  padding-left: 17rpx;
  padding-right: 17rpx;
  margin-top: 8rpx;
  padding-bottom: 150rpx;
  .line {
    height: 1px;
    background: #e8e8e8;
  }
  .line1 {
    margin-top: 35rpx;
  }
  .line2 {
    margin-top: 49rpx;
  }
  .address {
    padding: 35rpx 17rpx;
    background-color: #fff;
    .address-null {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 28rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #252525;
      }
      .arrow {
        width: 18rpx;
        height: 18rpx;
      }
    }
    .address-has {
      .address-top {
        display: flex;
        font-family: PingFang-SC-Regular, PingFang-SC;
        .top-btn {
          width: 50rpx;
          height: 28rpx;
          line-height: 28rpx;
          background: #807e8b;
          border-radius: 5rpx 5rpx 5rpx 5rpx;
          font-size: 20rpx;
          font-weight: 400;
          color: #ffffff;
          margin-right: 8rpx;
          text-align: center;
        }
        .top-des {
          color: #252525;
          font-size: 22rpx;
        }
      }
      .address-center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24rpx;
        .center-left {
          font-size: 28rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
        }
        .arrow {
          width: 15rpx;
          height: 15rpx;
        }
      }
      .address-des {
        margin-top: 24rpx;
        display: flex;
        align-items: center;
        font-size: 22rpx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #252525;
        .name {
          margin-right: 20rpx;
        }
        .phone {
        }
      }
    }
  }
  .good-info {
    margin-top: 13rpx;
    padding: 29rpx 18rpx 50rpx 18rpx;
    background-color: #fff;
    .info-head {
      display: flex;
      align-items: center;
      font-family: PingFang-SC-Bold, PingFang-SC;
      .logo {
        line-height: 32rpx;
        width: 34rpx;
        height: 32rpx;
        background: #000000;
        border-radius: 5rpx 5rpx 5rpx 5rpx;
        font-size: 20rpx;
        font-weight: bold;
        color: #ffffff;
        margin-right: 10rpx;
        text-align: center;
      }
      .title {
        font-weight: bold;
        color: #252525;
        font-size: 24rpx;
      }
      .line {
        width: 3rpx;
        height: 23rpx;
        background: #252525;
        margin-left: 10rpx;
        margin-right: 10rpx;
      }
      .time {
        font-size: 24rpx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        color: #252525;
      }
    }
    .goods-detail {
      margin-top: 57rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #252525;
      .detail-left {
        display: flex;
        align-items: center;
        .detail-pic {
          width: 122rpx;
          height: 122rpx;
          margin-right: 29rpx;
        }
        .detail-info {
          display: flex;
          flex-direction: column;
          max-width: 407rpx;
          .title {
            font-size: 24rpx;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
          }
          .info {
            font-size: 22rpx;
            font-family: PingFang-SC-Medium, PingFang-SC;
            color: #8b8b8b;
            display: flex;
            margin-top: 20rpx;
            .spec {
              margin-right: 20rpx;
            }
            .num {
            }
          }
        }
      }

      .price {
        display: flex;
        font-family: PingFang-SC-Heavy, PingFang-SC;
        font-weight: 800;
        color: #252525;
        .price-icon {
          font-size: 24rpx;
        }
        .price-num {
          font-size: 28rpx;
        }
      }
    }
    .discount {
      margin-top: 46rpx;
      .discount-item {
        &:last-child {
          margin-top: 45rpx;
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-left {
          display: flex;
          align-items: center;
          font-size: 24rpx;
          font-family: PingFang-SC-Medium, PingFang-SC;
          .title {
            font-weight: 500;
            color: #252525;
          }
          .des {
            margin-left: 107rpx;
            color: #8b8b8b;
          }
        }
        .item-right {
          font-family: PingFang-SC-Medium, PingFang-SC;
          display: flex;
          align-items: center;
          .price {
            font-size: 22rpx;
            color: #ff2442;
          }
          .arrow {
            width: 15rpx;
            height: 15rpx;
            margin-left: 21rpx;
          }
        }
        .item-quan {
          .price {
            color: #252525;
          }
        }
      }
    }
    .total {
      margin-top: 43rpx;
      display: flex;
      color: #252525;
      justify-content: flex-end;
      align-items: center;
      .total-des {
        font-size: 24rpx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
      }
      .total-price {
        font-size: 28rpx;
        font-family: HelveticaNeueLT-77BdCn, HelveticaNeueLT;
        font-weight: normal;
        font-weight: bold;
      }
    }
  }
  .statement {
    margin-top: 13rpx;
    padding: 31rpx 24rpx 34rpx 20rpx;
    background-color: #fff;

    .statement-item {
      margin-top: 24rpx;
      &:first-child {
        margin-top: 0;
      }
      color: #252525;
      .title {
        font-size: 24rpx;
        font-weight: bold;
      }
      .des {
        margin-top: 24rpx;
        font-size: 22rpx;
      }
    }
  }
  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 20rpx 31rpx 20rpx 36rpx;
    .bottom-left {
      .bottom-left-top {
        display: flex;
        align-items: center;
        .des {
          font-size: 22rpx;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: #252525;
        }
        .price {
          color: #ff2442;
          display: flex;
          align-items: flex-end;
          .price-icon {
            font-size: 24rpx;
            font-weight: 800;
          }
          .price-num {
            font-size: 32rpx;
            font-weight: bold;
            line-height: 36rpx;
          }
        }
      }
      .bottom-left-bottom {
        font-size: 22rpx;
        font-weight: 500;
        color: #252525;
      }
    }
    .btn {
      width: 238rpx;
      height: 70rpx;
      text-align: center;
      line-height: 70rpx;
      background: #0183fc;
      border-radius: 5rpx 5rpx 5rpx 5rpx;
      font-size: 26rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>