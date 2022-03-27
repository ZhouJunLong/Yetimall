<template>
  <view class="detail_container"
        v-if="showDetail">
    <view class="detail_header">
      <view class="detail_header_top">
        <view class=header_left>
          <view class="header_left_title header_title">{{ orderDetail.orderStateText }}</view>
          <view class="header_left_des header_des">{{ orderDetail.orderStateTextB }}</view>
        </view>
      </view>
      <!-- 快递信息 -->
      <view class="detail_header_address"
            v-if="trajectory"
            @click="gotoDelivery">
        <view class="detail_header_address_top">
          <view class="address_top_left">
            <image class="address_icon"
                   :src="local_url+'home/kuaidi.png'"></image>
            <text class="address_name">{{ trajectory.title }}</text>
          </view>
          <view class="address_kuaidi_name">{{ trajectory.express_name }}</view>
        </view>
        <view class="address_des ellipsis">{{ trajectory.content }}</view>
        <view class="address_time">{{ trajectory.content_date }}</view>
      </view>
    </view>
    <view class="detail_address">
      <view class="detail_address_top">
        <view class="address_top_left">
          <image class="address_icon"
                 :src="local_url+'home/location.png'"></image>
          <text class="address_name">收货人：{{ addressInfo.name }}</text>
        </view>
        <view class="address_mobile">{{ addressInfo.phone }}</view>
      </view>
      <view class="detail_address_des">{{ addressInfo.address + addressInfo.addressDetail }}</view>
    </view>
    <view class="detail_goods">
      <view class="goods_top">
        <view class="goods_top_title">bigpop平台直邮</view>
        <view class="goods_top_time"
              v-if="delivery_time">{{ delivery_time }}</view>
      </view>
      <view class="goods_list">
        <view class="good_item"
              v-for="(item,index) in goodsList"
              :key="index"
              @click="gotoGoodDetail"
              :data-gid="item.gid">
          <image class="good_item_pic"
                 :src="item.imgUrl"></image>
          <view class="good_item_right">
            <view class="good_item_title">{{ item.name }}</view>
            <view class="good_item_des">
              <view class="good_item_des_spec">
                <text>{{item.property || '默认' }}</text>
              </view>
              <view class="good_item_num">数量：x{{ item.count }}</view>
            </view>
            <view class="good_item_price">
              <text class="good_item_price_type">¥</text>
              <text class="good_item_price_num">{{ item.price }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="detail_fee">
      <view class="detail_fee_item">
        <view class="detail_fee_item_title">运费</view>
        <view class="detail_fee_item_num">¥{{feeDetail.deliveryFee}}</view>
      </view>
      <view class="detail_fee_item">
        <view class="detail_fee_item_title">合计支付</view>
        <view class="detail_fee_item_num">¥{{ feeDetail.orderPricePay }}</view>
      </view>
    </view>
    <view class="detail_info">
      <view class="info_title">订单信息</view>
      <view class="info_list">
        <view class="info_item">
          <view class="info_item_title">订单编号：</view>
          <view class="info_item_right">
            <view class="info_item_right_text">{{ infoDetail.orderNum }}</view>
            <view class="copy_btn"
                  @click="copy(infoDetail.orderNum)">复制</view>
          </view>
        </view>
        <view class="info_item">
          <view class="info_item_title">创建时间：</view>
          <view class="info_item_right">
            <view class="info_item_right_text">{{ infoDetail.addTime }}</view>
          </view>
        </view>
        <view class="info_item"
              v-if="infoDetail.deliveryNum">
          <view class="info_item_title">快递单号：</view>
          <view class="info_item_right"
                v-if="infoDetail.deliveryNum">
            <view class="info_item_right_text">{{ infoDetail.deliveryNum }}</view>
            <view class="copy_btn"
                  @click="copy(infoDetail.deliveryNum)">复制</view>
          </view>
        </view>
        <view class="info_item"
              v-if="orderStateObj.showPayMethod">
          <view class="info_item_title">支付方式：</view>
          <view class="info_item_right">
            <view class="info_item_right_text">{{ infoDetail.pay_method }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="detail_remark"
          v-if="remark_text">
      <view class="remark_title">订单备注</view>
      <view class="remark_text">{{ remark_text }}</view>
    </view>
    <!-- 底部按钮 -->
    <view class="bottom_wrap">
      <view class="cancel_btn detail_btn"
            v-if="orderStateObj.showCancelBtn"
            @click="cancelOrder">取消订单</view>
      <view class="cancel_btn detail_btn"
            v-if="orderStateObj.showRefundOrderBtn"
            @click="refundOrder">申请退款</view>
      <view class="cancel_btn detail_btn"
            v-if="orderStateObj.showDeleteOrderBtn"
            @click="deleteOrder">删除订单</view>
      <view class="cancel_pri detail_btn"
            v-if="orderStateObj.showPayBtn"
            @click="payOrder">立即付款</view>
      <!-- <view class="cancel_pri detail_btn"
            @click="payOrder">立即付款</view> -->
      <!-- <view class="cancel_pri detail_btn" v-if="orderStateObj.showComment" @click="addComment">评价</view> -->
    </view>
  </view>
</template>
<script>
import tools from '@common/tools.js'
import CONFIG from '@common/config.js'
import { mapState, mapActions, mapMutations } from 'vuex'
let base_url = CONFIG.BASE_URL
const stateConfig = CONFIG.stateConfig
let is_click = true
export default {
  data() {
    return {
      base_url: base_url,
      oid: '',
      orderDetail: null,
      showDetail: false,
      local_url: CONFIG.LOACL_URL,
    }
  },
  onLoad(options) {
    this.oid = options.oid
    this.getOrderDetail()
  },
  computed: {
    orderState() {
      if (!this.orderDetail) return false
      const { orderState } = this.orderDetail
      return orderState
    },
    orderStateObj() {
      if (!this.orderDetail) return {}
      let obj = stateConfig.find((item) => {
        return item.state === this.orderState
      })
      if (!obj) return []
      return obj
    },
    addressInfo() {
      if (!this.orderDetail) return {}
      const { name, addressDetail, phone, address } = this.orderDetail
      return {
        address,
        name,
        addressDetail,
        phone: tools.formatPhone(phone),
      }
    },
    goodsList() {
      if (!this.orderDetail) return []
      return this.orderDetail.orderGoodsList || []
    },
    feeDetail() {
      if (!this.orderDetail) return {}
      const { orderPricePay, deliveryFee } = this.orderDetail
      return {
        orderPricePay: orderPricePay || 0,
        deliveryFee: deliveryFee || 0,
      }
    },
    infoDetail() {
      if (!this.orderDetail) return {}
      const { orderNum, deliveryNum, addTime, payType } = this.orderDetail
      return {
        orderNum,
        addTime,
        payType:
          payType == 3 ? '余额支付' : payType === 2 ? '支付宝支付' : '微信支付',
        deliveryNum,
      }
    },
    // 备注
    remark_text() {
      if (!this.orderDetail) return ''
      const { remarksUser } = this.orderDetail
      return remarksUser || ''
    },
    // 发货时间
    delivery_time() {
      if (!this.orderDetail) return ''
      const { deliveryTime } = this.orderDetail
      return deliveryTime || ''
    },
    // 快递信息
    trajectory() {
      if (
        !this.orderDetail ||
        !this.orderDetail.deliveryList ||
        this.orderDetail.deliveryList.length <= 0
      )
        return false
      const { deliveryList } = this.orderDetail
      return deliveryList[0]
    },
  },
  methods: {
    ...mapActions(['getOrderInfo']),
    gotoDelivery() {
      uni.navigateTo({
        url: '/pages/userCenter/deliveryLine?oid=' + this.oid,
      })
    },
    //获取订单详情
    // https://www.yetimall.fun/public/home/WxStore/getOrderInfo?oid=2898
    async getOrderDetail() {
      let res = await this.getOrderInfo(this.oid)
      if (res) {
        this.orderDetail = res
        this.showDetail = true
      }
    },

    copy(data) {
      tools.copy(data)
    },
  },
}
</script>
<style lang="scss" scoped>
page {
  background: #f3f6f9;
}
.detail_container {
  width: 100%;
  padding: 0;
  background: #f3f6f9;
  box-sizing: border-box;
  font-family: PingFang-SC-Bold, PingFang-SC;
  padding-bottom: 106rpx;
  .detail_header {
    background: #2c2c38;
    padding: 53rpx 17rpx 28rpx 17rpx;
    .detail_header_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0rpx 17rpx 0rpx 17rpx;
      .header_title {
        font-size: 32rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        // font-weight: bold;
        color: #ffffff;
        line-height: 32rpx;
      }
      .header_des {
        margin-top: 18rpx;
        font-size: 22rpx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        color: #ffffff;
        line-height: 22px;
      }
    }
    .detail_header_address {
      margin-top: 40rpx;
      padding: 38rpx 20rpx;
      background-color: #fff;
      .detail_header_address_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .address_top_left {
          display: flex;
          align-items: center;
          .address_icon {
            width: 36rpx;
            height: 31rpx;
            margin-right: 20rpx;
          }
          .address_name {
            color: #252525;
            font-weight: bold;
            font-size: 28rpx;
          }
        }
        .address_kuaidi_name {
          font-size: 28rpx;
          font-weight: bold;
        }
      }
      .address_des {
        margin-top: 32rpx;
        margin-bottom: 23rpx;
        font-size: 22rpx;
        color: #8b8b8b;
        margin-left: 60rpx;
      }
      .address_time {
        font-size: 22rpx;
        color: #8b8b8b;
        margin-left: 60rpx;
      }
    }
  }
  .detail_address {
    background: #fff;
    padding: 32rpx 36rpx;
    margin-top: 13rpx;
    .detail_address_top {
      display: flex;
      justify-content: space-between;
      font-size: 26rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #252525;
      .address_top_left {
        display: flex;
        .address_icon {
          width: 27rpx;
          height: 36rpx;
        }
        .address_name {
          margin-left: 9rpx;
        }
      }
    }
    .detail_address_des {
      padding-left: 34rpx;
      font-size: 24rpx;
      margin-top: 33rpx;
      font-family: PingFang-SC-Medium, PingFang-SC;
      color: #8b8b8b;
      line-height: 24rpx;
    }
  }
  .detail_goods {
    padding: 34rpx;
    margin-top: 13rpx;
    background-color: #fff;
    font-family: PingFang-SC-Bold, PingFang-SC;
    .goods_top {
      display: flex;
      justify-content: space-between;
      .goods_top_title {
        font-size: 26rpx;
        color: #252525;
        line-height: 26rpx;
      }
      .goods_top_time {
        font-size: 24rpx;
        color: #8b8b8b;
        line-height: 24rpx;
      }
    }
    .goods_list {
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
        }
      }
    }
  }
  .detail_fee {
    background-color: #fff;
    margin-top: 13rpx;
    padding: 30rpx 35rpx;
    font-family: PingFang-SC-Bold, PingFang-SC;
    .detail_fee_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #252525;
      &:first-child {
        margin-bottom: 39rpx;
      }
      .detail_fee_item_title {
        font-size: 24rpx;
        font-weight: bold;
      }
      .detail_fee_item_num {
        font-size: 28rpx;
        font-weight: bold;
      }
      .detail_fee_item_num1 {
        font-size: 22rpx;
        color: #ff2442;
      }
    }
  }
  .detail_info {
    background: #fff;
    margin-top: 13rpx;
    font-family: PingFang-SC-Bold, PingFang-SC;
    padding: 30rpx 35rpx;
    .info_title {
      font-size: 24rpx;
      color: #252525;
    }
    .info_list {
      .info_item {
        margin-top: 28rpx;
        color: #8b8b8b;
        display: flex;
        justify-content: space-between;
        .info_item_title {
          font-size: 24rpx;
        }
        .info_item_right {
          display: flex;
          align-items: center;
          font-size: 22rpx;
          .info_item_right_text {
          }
          .copy_btn {
            margin-left: 6rpx;
            width: 58rpx;
            height: 28rpx;
            font-size: 20rpx;
            border-radius: 5rpx 5rpx 5rpx 5rpx;
            border: 1rpx solid #8b8b8b;
            text-align: center;
            line-height: 28rpx;
          }
        }
      }
    }
  }
  .detail_remark {
    background: #fff;
    margin-top: 13rpx;
    font-family: PingFang-SC-Bold, PingFang-SC;
    padding: 30rpx 35rpx;
    .remark_title {
      font-size: 24rpx;
      color: #252525;
    }
    .remark_text {
      font-size: 22rpx;
      color: #8b8b8b;
      margin-top: 28rpx;
    }
  }
  .bottom_wrap {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 106rpx;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30rpx;

    .cancel_btn {
      color: #8b8b8b;
      border: 1px solid #8b8b8b;
    }
    .cancel_pri {
      background: #0183fc;
      color: #ffffff;
    }
    .detail_btn {
      width: 238rpx;
      height: 70rpx;
      text-align: center;
      font-size: 26rpx;
      line-height: 70rpx;
      border-radius: 5rpx 5rpx 5rpx 5rpx;
      margin-left: 21rpx;
    }
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>