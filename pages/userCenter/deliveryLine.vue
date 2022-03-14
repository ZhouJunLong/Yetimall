<template>
  <view class="container">
    <view class="header">
      <view class="header-top">
        <image class="header-pic"
               src='../../static/temp/rank-shop.png'></image>
        <view class="header-title">快递当前已到达郑州市</view>
      </view>
      <view class="header-bottom">
        <view class="header-info">
          <view class="order_num">
            <view class="title">顺丰速运：</view>
            <view class="num">{{ delivery_num }}</view>
            <view class="copy_btn"
                  @click="copy(delivery_num)">复制</view>
          </view>
          <view class="order_num">
            <view class="title">快递电话：</view>
            <view class="num">{{ delivery_tel }}</view>
          </view>
        </view>
        <view class="call-btn">联系快递</view>
      </view>
    </view>
    <view class="info">
      <view class="title">韩国-河南郑州市</view>
      <view class="list">
        <view class="item"
              v-for="(item,index) in 10"
              :key="index">
          <view class="item-time">
            <view class="time-top">2021/12/25</view>
            <view class="time-bottom">16:20</view>
          </view>
          <view class="line">
            <image class="icon"
                   src='../../static/images/user/delivery-2.png'></image>
            <view class="line-line"></view>
          </view>
          <view class="item-info">
            <view class="item-info-title">在途中</view>
            <view class="item-info-des">您的快件已由快递驿站代收，感谢您使用顺丰 快递，期待再次为您服务</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import tools from '../../common/tools.js'
export default {
  data() {
    return {
      delivery_num: '324234762378563476',
      delivery_tel: 95533,
    }
  },
  methods: {
    copy(data) {
      tools.copy(data)
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  padding-left: 13rpx;
  padding-right: 13rpx;
  padding-top: 13rpx;
  .header {
    padding: 30rpx;
    background-color: #fff;
    .header-top {
      display: flex;
      align-items: center;
      .header-pic {
        width: 77rpx;
        height: 77rpx;
        margin-right: 20rpx;
      }
      .header-title {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #252525;
      }
    }
    .header-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-info {
        .order_num {
          margin-top: 10rpx;
          display: flex;
          align-items: center;
          font-size: 20rpx;
          color: #252525;

          .title {
            // font-weight: bold;
          }
          .num {
          }
          .copy_btn {
            margin-left: 10rpx;
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
      .call-btn {
        width: 135rpx;
        height: 49rpx;
        background: #0183fc;
        border-radius: 5rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 49rpx;
        text-align: center;
      }
    }
  }
  .info {
    padding: 37rpx 28rpx 37rpx 28rpx;
    margin-top: 12rpx;
    background-color: #fff;
    .title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #252525;
    }
    .list {
      margin-top: 53rpx;
      .item {
        display: flex;
        height: 200rpx;
        &:last-child {
          .line {
            .line-line {
              height: 0;
              border: 0;
            }
          }
        }
        .item-time {
          width: 163rpx;
          font-size: 20rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #8b8b8b;
          .time-top {
          }
          .time-bottom {
          }
        }
        .line {
          width: 28rpx;
          padding-left: 20rpx;
          padding-right: 20rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon {
            width: 28rpx;
            height: 28rpx;
          }
          .line-line {
            height: 173rpx;
            border: 1px dashed #8b8b8b;
          }
          .line-line-active {
            height: 173rpx;
            border: 1px dashed #0183fc;
          }
        }
        .item-info {
          font-family: PingFang SC;
          font-weight: 500;
          .item-info-title {
            font-size: 26rpx;
            color: #252525;
          }

          .item-info-des {
            margin-top: 23rpx;
            font-size: 24rpx;
            color: #8b8b8b;
          }
        }
      }
      .actvie {
        color: #0183fc;
      }
    }
  }
}
</style>