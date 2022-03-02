<template>
  <view class="shop-header">
    <view class="head-sort-item"
          @click="clickType(0)">
      <view :class="currentOrderByType == 0 ? 'active-selected' : ''">综合排序</view>
    </view>
    <view class="head-sort-item"
          @click="clickType(1)">
      <view :class="currentOrderByType == 1 ? 'active-selected' : ''">价格</view>
      <view class="sort">
        <image class="sort-icon rotate"
               src="../../static/images/home/sort.png"></image>
        <image class="sort-icon"
               src="../../static/images/home/sort.png"></image>

      </view>
    </view>
    <view class="head-sort-item"
          @click="clickType(2)">
      <view :class="currentOrderByType == 2 ? 'active-selected' : ''">上架时间</view>
    </view>
    <view class="head-sort-item"
          @click="clickType(3)">
      <view :class="currentOrderByType == 3 ? 'active-selected' : ''">销量</view>
      <view class="sort">
        <image class="sort-icon rotate"
               src="../../static/images/home/sort.png"></image>
        <image class="sort-icon"
               src="../../static/images/home/sort.png"></image>

      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'home-shop-header',
  props: {},
  data() {
    return {
      currentOrderByType: 0,
      orderByTypeT: 1,
    }
  },
  methods: {
    clickType(currentOrderByType) {
      if (this.currentOrderByType !== currentOrderByType) {
        this.orderByTypeT = 1
      } else {
        this.orderByTypeT = 2
      }
      this.currentOrderByType = currentOrderByType
      this.$emit('goodsSort', {
        orderByType: currentOrderByType,
        orderByTypeT: this.orderByTypeT,
      })
    },
  },
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
    display: flex;
    align-items: center;
    .sort {
      display: flex;
    }
    .sort-icon {
      height: 24rpx;
      width: 10rpx;
    }
    .rotate {
      transform: rotate(180deg);
    }
  }
  .active-selected {
    font-weight: bold;
    color: #252525;
  }
  .head-sort-item-active {
    font-size: 26rpx;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #252525;
  }
}
</style>