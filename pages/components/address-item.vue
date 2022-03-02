<template>
  <view>
    <view class="address-item">
      <view class="item-top">
        <view class="top-left">
          <view class="item-icon">鹿</view>
          <view class="item-info">
            <view class="info-top">
              <view class="item-name">鹿聪明</view>
              <view class="item-phone">156****2647</view>
            </view>
            <view class="info-bottom">
              <view class="info-bottom-def">默认</view>
              <view class="info-bottom-address">河南省郑州市管城回族区金成国贸大厦</view>
            </view>
          </view>
        </view>
        <view class="top-right">
          <view class="line"></view>
          <image class="edit"></image>
        </view>
      </view>
      <view class="item-bottom">
        <view class="item-bottom-left">
          <image class="select selected"></image>
          <view class="text">默认地址</view>
        </view>
        <view class="item-bottom-right">删除</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'goosCard',
  methods: {},
}
</script>
<style lang="scss" scoped>
.address-item {
  padding: 11rpx 37rpx 0rpx 35rpx;
  background-color: #fff;
  margin-bottom: 13rpx;
  .item-top {
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 17rpx;
    .top-left {
      display: flex;
      align-items: center;
      .item-icon {
        width: 70rpx;
        height: 70rpx;
        background: #f6f5fa;
        border-radius: 50%;
        text-align: center;
        line-height: 70rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #8b8b8b;
        margin-right: 15rpx;
      }
      .item-info {
        display: flex;
        flex-direction: column;

        .info-top {
          display: flex;
          align-items: center;
          font-family: PingFang SC;
          color: #252525;
          .item-name {
            font-size: 28rpx;
            font-weight: bold;
            margin-right: 31rpx;
          }
          .item-phone {
            font-size: 28rpx;
            font-weight: 500;
            color: #8b8b8b;
          }
        }
        .info-bottom {
          display: flex;
          align-items: center;
          font-family: PingFang SC;
          margin-top: 25rpx;
          .info-bottom-def {
            width: 50rpx;
            height: 28rpx;
            background: #f6f5fa;
            border-radius: 5rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #8b8b8b;
            text-align: center;
            line-height: 28rpx;
            margin-right: 12rpx;
          }
          .info-bottom-address {
            font-size: 22rpx;
            font-weight: 500;
            color: #252525;
          }
        }
      }
    }
    .top-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      .line {
        width: 1px;
        height: 40px;
        background: #e8e8e8;
      }
      .edit {
        margin-left: 20rpx;
        background-color: #8b8b8b;
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
  .item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang SC;
    height: 87rpx;
    .item-bottom-left {
      display: flex;
      align-items: center;

      .select {
        width: 20rpx;
        height: 20rpx;
        border: 1px solid #8b8b8b;
        border-radius: 50%;
        margin-right: 9rpx;
      }
      .text {
        font-size: 24rpx;
        font-weight: 500;
        color: #8b8b8b;
      }
    }
    .item-bottom-right {
      font-size: 22rpx;
      font-weight: 500;
      color: #8b8b8b;
    }
  }
}
</style>