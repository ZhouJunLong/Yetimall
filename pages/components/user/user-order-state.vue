<template>
  <view class="wrap-state all-padding">
    <view class="title-wrap">
      <view class="title-left">购买</view>
      <view class="title-right"
            @click="gotoOrderList">查看全部></view>
    </view>
    <view class="state-list">
      <view class="item"
            v-for="(item,index) in stateList"
            :key="index"
            @click="jumpPage(item)">
        <image class="item-icon"
               mode="aspectFit"
               :style="{ 'width':item.iconWidth }"
               :src="'../../../static/images/user/'+item.icon+'.png'"></image>
        <view class="item-title">{{item.title}}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'userOrderState',
  data() {
    return {
      stateList: [
        {
          state: 0,
          title: '待付款',
          icon: 'state-1',
          iconWidth: '52rpx',
          jumpUrl: '/pages/userCenter/orderList?state=0',
        },
        {
          state: 1,
          title: '待发货',
          icon: 'state-2',
          iconWidth: '47rpx',
          jumpUrl: '/pages/userCenter/orderList?state=1',
        },
        {
          state: 2,
          title: '待收货',
          icon: 'state-3',
          iconWidth: '52rpx',
          jumpUrl: '/pages/userCenter/orderList?state=2',
        },
        {
          state: 4,
          title: '收藏',
          icon: 'state-4',
          iconWidth: '42rpx',
          jumpUrl: '/pages/userCenter/collect',
        },
        { state: 5, title: '足迹', icon: 'state-5', iconWidth: '48rpx' },
      ],
    }
  },
  methods: {
    jumpPage(item) {
      uni.navigateTo({
        url: item.jumpUrl,
      })
    },
    gotoOrderList() {
      uni.navigateTo({
        url: '/pages/userCenter/orderList?state=100',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap-state {
  background-color: #fff;
  font-family: PingFang SC;
  padding-top: 35rpx;
  padding-bottom: 35rpx;
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-left {
      font-size: 28rpx;
      font-weight: 500;
      color: #000000;
    }
    .title-right {
      font-size: 22rpx;
      font-weight: 500;
      color: #a3a3b4;
    }
  }
  .state-list {
    display: flex;
    margin-top: 35rpx;
    justify-content: space-between;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-icon {
        height: 39rpx;
        margin-bottom: 19rpx;
      }
      .item-title {
        font-size: 20rpx;
        font-weight: 500;
        color: #000000;
      }
    }
  }
}
.all-padding {
  padding-left: 28rpx;
  padding-right: 28rpx;
}
</style>