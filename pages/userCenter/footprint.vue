<!--
 * @Author: your name
 * @Date: 2022-03-27 15:54:09
 * @LastEditTime: 2022-03-27 16:30:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Yetimall/pages/userCenter/footprint.vue
-->
<template>
  <view class="container">
    <view class="time-list">
      <view class="time-item"
            v-for="(item,index) in 6"
            :key="index">
        <view class="title">
          <view class="icon"></view>
          <view class="time">2022/03/12</view>
        </view>
        <view class="goods-list">
          <view class="goods-item"
                v-for="(item,index) in 5"
                :key="index">
            <image class="good-pic"
                   src='../../static/temp/rank-shop.png'></image>
            <view class="good-price">¥218</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.container {
  font-family: PingFang SC;
  color: #252525;

  .time-list {
    .time-item {
      margin-top: 45rpx;
      .title {
        padding-left: 31rpx;
        display: flex;
        align-items: center;
        .icon {
          width: 13rpx;
          height: 13rpx;
          background: #0183fc;
          border-radius: 50%;
          margin-right: 20rpx;
        }
        .time {
          font-size: 26rpx;
          font-weight: bold;
        }
      }
      .goods-list {
        margin-top: 20rpx;
        background-color: #fff;
        margin-left: 63rpx;
        margin-right: 47rpx;
        display: flex;
        padding: 10rpx 30rpx 42rpx;
        flex-wrap: wrap;
        .goods-item {
          &:nth-child(3n) {
            margin-right: 0;
          }
          margin-top: 33rpx;
          display: flex;
          flex-direction: column;
          margin-right: 10rpx;
          .good-pic {
            width: 180rpx;
            height: 180rpx;
            border: 1px solid #8b8b8b;
            border-radius: 10rpx;
          }
          .good-price {
            margin-top: 15rpx;
            font-size: 28rpx;
            font-family: Helvetica Neue LT;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>