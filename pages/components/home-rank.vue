<template>
  <view class="container-rank">
    <view class="rank-title">畅销榜</view>
    <view class="rank-list">
      <view class="rank-item"
            @click="gotoDetail"
            v-for="(item,index) in 9"
            :key="index">
        <view class="rank-item-title">No.{{index+1}}</view>
        <view class="rank-item-other">
          <image class="rank-item-img"
                 src="../../static/temp/rank-shop.png"></image>
          <view class="rank-item-name">
            <view>林允儿</view>
            <view>同款巴宝莉香水</view>
          </view>
          <view class="rank-item-bottom">
            <view class="rank-item-bottom-price">¥1350</view>
            <view class="rank-item-bottom-sale">本月成交462</view>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'home-rank',
  methods: {
    gotoDetail() {
      uni.navigateTo({
        url: '/pages/home/goodsDeatil',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container-rank {
  padding-left: 28rpx;
  padding-bottom: 39rpx;
  .rank-title {
    font-family: PingFang-SC-Bold, PingFang-SC;
    color: #000000;
    font-size: 28rpx;
  }
  .rank-list {
    overflow-x: scroll;
    margin-top: 12rpx;
    display: flex;
    .rank-item {
      min-width: 180rpx;
      margin-right: 45rpx;
      color: #252525;
      font-family: PingFang-SC;
      display: flex;
      flex-direction: column;
      .rank-item-title {
        background: #eeeeee;
        padding: 7rpx;
        font-family: PingFang-SC-Heavy, PingFang-SC;
        font-size: 20rpx;
        font-weight: bold;
        width: 57rpx;
        text-align: center;
      }
      .rank-item-other {
        display: flex;
        flex-direction: column;
        align-items: center;
        .rank-item-img {
          margin-top: 18rpx;
          border: 1px solid #eee;
          width: 120rpx;
          height: 120rpx;
        }
        .rank-item-name {
          margin-top: 14rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-size: 22rpx;
        }
        .rank-item-bottom {
          display: flex;
          align-items: center;
          .rank-item-bottom-price {
            font-size: 22rpx;
            font-weight: bold;
          }
          .rank-item-bottom-sale {
            color: #dc4e4b;
            font-size: 18rpx;
            margin-left: 12rpx;
          }
        }
      }
    }
  }
}
</style>