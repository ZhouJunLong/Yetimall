<template>
  <view class="userCenter">
    <view class="header-bg">
      <view class="header-wrap">
        <view class="header-left">
          <image class="avatar"
                 src="../../static/images/user/avatar.png"></image>
          <view class="header-info"
                v-if="isAuthorize">
            <view class="title">
              <view class="titlt-text">权志龙的粉丝</view>
              <image class="sex"
                     src='../../static/images/user/sex.png'></image>
            </view>
            <view class="info-detail">
              <view class="info-id">ID</view>
              <view class="info-num">1057162</view>
              <view class="info-address">河南·郑州</view>
            </view>
          </view>
          <view class="header-none"
                v-else>默认昵称</view>
        </view>
        <view class="btn-wraps"
              @click='clickAccount'>
          <view class="authorize">{{ btnText }}</view>
        </view>
      </view>
    </view>
    <view class="wrap">
      <view class="discount all-padding">
        <image class="discount-bg"
               src='../../static/images/user/discount-bg.png'></image>
        <view class="discount-wrap">
          <view class="discount-left">
            <image class="discount-icon"
                   src='../../static/images/user/discount-icon.png'></image>
            <view class="line"></view>
            <view class="text">
              <text class="text-def">您有</text>
              <text class="text-sel">一张50元</text>
              <text class="text-def">优惠券可使用</text>
            </view>
          </view>
          <view class="discount-use">立即使用></view>
        </view>
      </view>
      <!-- 去查看订单状态 -->
      <user-order-state></user-order-state>
      <view class="recommed">
        <view class="title">
          <image class="title-img"
                 src='../../static/images/user/user-recommon.png'></image>
        </view>
        <view class="shop-goods">
          <good-card v-for="(item,index) in 10"
                     :key="index"></good-card>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import goodCard from '../components/goods-card.vue'
import userOrderState from '../components/user/user-order-state.vue'
export default {
  components: {
    'good-card': goodCard,
    'user-order-state': userOrderState,
  },
  data() {
    return {
      isAuthorize: true,
      stateList: [
        { state: 1, title: '待付款', icon: 'state-1', iconWidth: '52rpx' },
        { state: 2, title: '待发货', icon: 'state-2', iconWidth: '47rpx' },
        { state: 3, title: '待收货', icon: 'state-3', iconWidth: '52rpx' },
        { state: 4, title: '收藏', icon: 'state-4', iconWidth: '42rpx' },
        { state: 5, title: '足迹', icon: 'state-5', iconWidth: '48rpx' },
      ],
    }
  },
  computed: {
    btnText() {
      return this.isAuthorize ? '账户设置' : '授权登陆'
    },
  },
  onLoad() {},
  methods: {
    clickAccount() {
      //   这里其实应该从userInfo中取
      const tokenInfo = uni.getStorageSync('tokenInfo')
      let phone = tokenInfo.telephone || ''
      if (!this.isAuthorize) {
        this.isAuthorize = true
      } else if (phone) {
        uni.navigateTo({
          url: '/pages/userCenter/accountManage',
        })
      } else {
        uni.navigateTo({
          url: '/pages/userCenter/bindMobile',
        })
      }
    },
  },
}
</script>
<style>
/* page {
  background: #ffffff;
} */
</style>

<style lang="scss" scoped>
.userCenter {
  .header-bg {
    height: 312rpx;
    background: #0183fc;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .header-wrap {
      padding: 0 28rpx 32rpx 28rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-left {
      display: flex;
      align-items: center;
    }
    .avatar {
      width: 164rpx;
      height: 164rpx;
      border-radius: 50%;
      margin-right: 17rpx;
    }
    .header-info {
      font-family: PingFang SC;
      .title {
        display: flex;
        align-items: center;
        .titlt-text {
          font-size: 28rpx;
          font-weight: bold;
          color: #ffffff;
          margin-right: 15rpx;
        }
        .sex {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .info-detail {
        display: flex;
        align-items: center;
        margin-top: 8rpx;
        .info-id {
          width: 28rpx;
          height: 28rpx;
          background: #ffffff;
          border-radius: 50%;
          font-size: 20rpx;
          font-weight: 800;
          color: #0183fc;
          text-align: center;
          line-height: 28rpx;
          margin-right: 3rpx;
        }
        .info-num {
          font-size: 22rpx;
          font-weight: 500;
          color: #ffffff;
          margin-right: 16rpx;
        }
        .info-address {
          height: 34rpx;
          background: #ffffff;
          border-radius: 17rpx;
          font-size: 20rpx;
          font-weight: 500;
          color: #252525;
          text-align: center;
          line-height: 34rpx;
          padding-left: 11rpx;
          padding-right: 11rpx;
        }
      }
    }
    .header-none {
      font-weight: bold;
      color: #ffffff;
      font-size: 28rpx;
      font-family: PingFang SC;
    }
    .btn-wraps {
      width: 143rpx;
      height: 57rpx;
      background: #ffffff;
      border-radius: 5rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .authorize {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #0183fc;
      }
    }
  }
  .wrap {
    .discount {
      background-color: #fff;
      padding-top: 33rpx;
      height: 71rpx;
      position: relative;
      .discount-bg {
        position: absolute;
        width: 689rpx;
        height: 71rpx;
        left: 30rpx;
      }
      .discount-wrap {
        position: absolute;
        height: 71rpx;
        display: flex;
        // width: 689rpx;
        align-items: center;
        left: 58rpx;
        right: 58rpx;
        display: flex;
        justify-content: space-between;
        .discount-left {
          display: flex;
          align-items: center;
          .discount-icon {
            width: 95rpx;
            height: 31rpx;
          }
          .line {
            width: 1px;
            height: 25rpx;
            background: #ffffff;
            margin-right: 17rpx;
            margin-left: 17rpx;
          }
          .text {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            .text-def {
              color: #ffffff;
            }
            .text-sel {
              color: #0183fc;
            }
          }
        }
        .discount-use {
          font-size: 22rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #0183fc;
        }
      }
    }
    .recommed {
      .title {
        width: 100%;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .title-img {
          width: 195rpx;
          height: 25rpx;
        }
      }
    }
    .shop-goods {
      display: flex;
      flex-wrap: wrap;
    }
    .all-padding {
      padding-left: 28rpx;
      padding-right: 28rpx;
    }
  }
}
</style>