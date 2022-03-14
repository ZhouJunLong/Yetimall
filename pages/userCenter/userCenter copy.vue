<template>
  <view class="userCenter">
    <view class="header">
      <image class="head_bg"
             src='../../static/temp/user_bg.png'></image>
    </view>
    <view class="wrap">
      <image class="info-bg"
             src="../../static/images/user/bg.png">
      </image>
      <view class="wrap-center">
        <view class="info-detail">
          <image class="avatar all-padding"
                 src="../../static/images/user/avatar.png"></image>
          <view class="detail all-padding">
            <view class="info-left">
              <view class="title">
                <view class="titlt-text">权志龙的粉丝</view>
                <image class="sex"
                       src='../../static/images/user/sex.png'></image>
              </view>
              <view class="detail-left">
                <view class="left-id">ID</view>
                <view class="left-num">1057162</view>
                <view class="left-address">河南·郑州</view>
              </view>
            </view>
            <view class="info-right">更换背景</view>
          </view>
          <view class="edit all-padding">
            <image class="icon"
                   src='../../static/images/user/bianji.png'></image>
            <view class="sign">快去编一个签名让更多人认识你吧！</view>
          </view>
        </view>
        <!-- <view class="wrap-btn-list all-padding">
          <view class="item">
            <view class="item-num">0</view>
            <view class="item-title">获赞与收藏</view>
          </view>
          <view class="item">
            <view class="item-num">0</view>
            <view class="item-title">粉丝</view>
          </view>
          <view class="item">
            <view class="item-num">0</view>
            <view class="item-title">关注</view>
          </view>
          <view class="item">
            <view class="item-num">0</view>
            <view class="item-title">动态</view>
          </view>
        </view> -->
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
          <view class="title">为您推荐</view>
          <view class="shop-goods">
            <good-card v-for="(item,index) in 10"
                       :key="index"></good-card>
          </view>
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
      stateList: [
        { state: 1, title: '待付款', icon: 'state-1', iconWidth: '52rpx' },
        { state: 2, title: '待发货', icon: 'state-2', iconWidth: '47rpx' },
        { state: 3, title: '待收货', icon: 'state-3', iconWidth: '52rpx' },
        { state: 4, title: '收藏', icon: 'state-4', iconWidth: '42rpx' },
        { state: 5, title: '足迹', icon: 'state-5', iconWidth: '48rpx' },
      ],
    }
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
  //   background-color: #fff;
  .header {
    .head_bg {
      width: 750rpx;
      height: 750rpx;
    }
  }
  .wrap {
    margin-top: -321rpx;
    position: relative;
    .info-bg {
      width: 750rpx;
      height: 800rpx;
      position: absolute;
      top: -80rpx;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .wrap-center {
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;

      //  left: 28rpx;
      //  right: 28rpx;

      .info-detail {
        //    background: linear-gradient(#fff, #888);
        .avatar {
          width: 164rpx;
          height: 164rpx;
        }
        .detail {
          // box-shadow: 0px -50rpx 30rpx #8888;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: PingFang SC;
          margin-top: 12rpx;
          .info-left {
            .title {
              display: flex;
              align-items: center;
              .titlt-text {
                font-size: 28rpx;
                font-weight: bold;
                color: #1f1f1f;
              }
              .sex {
                margin-left: 9rpx;
                width: 30rpx;
                height: 30rpx;
              }
            }
            .detail-left {
              display: flex;
              margin-top: 12rpx;
              .left-id {
                width: 28rpx;
                height: 28rpx;
                background: #0183fc;
                border-radius: 50%;
                font-size: 20rpx;
                font-weight: 800;
                color: #ffffff;
                line-height: 28rpx;
                text-align: center;
                margin-right: 9rpx;
              }
              .left-num {
                font-weight: 500;
                color: #878787;
                font-size: 22rpx;
                margin-right: 21rpx;
              }
              .left-address {
                font-weight: 500;
                color: #878787;
                font-size: 22rpx;
              }
            }
          }
          .info-right {
            width: 143rpx;
            height: 57rpx;
            background: #0183fc;
            border-radius: 5rpx;
            font-weight: bold;
            color: #fefefe;
            font-size: 26rpx;
            text-align: center;
            line-height: 57rpx;
          }
        }
        .edit {
          background-color: #fff;
          display: flex;
          align-items: center;
          padding-top: 25rpx;
          .icon {
            width: 28rpx;
            height: 28rpx;
            margin-right: 10rpx;
          }
          .sign {
            font-size: 22rpx;
            font-weight: 500;
            color: #878787;
          }
        }
      }
      .wrap-btn-list {
        background-color: #fff;
        padding-top: 30rpx;
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .item-num {
            font-size: 26rpx;
            font-family: FZHanZhenGuangBiaoS-GB;
            font-weight: bold;
            color: #000000;
          }
          .item-title {
            margin-top: 16rpx;
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #878787;
          }
        }
      }
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
    }
  }
  .recommed {
    .title {
      height: 88rpx;
      line-height: 88rpx;
      font-size: 26rpx;
      font-family: FZHanZhenGuangBiaoS-GB;
      font-weight: bold;
      color: #0183fc;
      text-align: center;
      //  background-color: #f3f6f9;
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
</style>