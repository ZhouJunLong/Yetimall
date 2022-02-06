<template>
  <view class="shop-header">
    <view class="head-sort-item">
      <text>综合排序</text>
    </view>
    <view class="head-sort-item">
      <text>价格</text>
      <!-- <image class=""></image> -->
    </view>
    <view class="head-sort-item">
      <text>上架时间</text>
    </view>
    <view class="head-sort-item">
      <text>销量</text>
    </view>
  </view>
</template>
<script>
export default {
  name: 'home-shop-header',
}
</script>
<style lang="scss" scoped>
.shop-header {
      height: 100rpx;
      background-color: #fff;
      font-family: PingFang-SC-Medium, PingFang-SC;
      display: flex;
      justify-content: space-around;
      .head-sort-item {
        color: #8b8b8b;
        font-size: 26rpx;
        display: flex;
        align-items: center;
      }
      .head-sort-item-active {
        font-size: 26rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #252525;
      }
    }
</style>