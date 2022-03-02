<template>
  <view class="container">
    <!-- 地址列表   -->
    <view class="address-list">
      <address-item v-for="(item,index) in 10"
                    :key="index"></address-item>
    </view>

    <view class="btn-wrap">
      <view class="btn"
            @click="addAddress()">添加新地址</view>
    </view>
  </view>
</template>
<script>
import addressItem from '../components/address-item.vue'

export default {
  components: {
    'address-item': addressItem,
  },
  methods: {
    addAddress() {
      uni.navigateTo({
        url: '/pages/home/addNewAddress',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 200rpx;
  .address-list {
    margin-top: 4rpx;
    background-color: #f3f6f9;
  }
  .btn-wrap {
    position: fixed;
    bottom: 0rpx;
    left: 0;
    right: 0;
    padding: 20rpx 17rpx 67rpx 17rpx;
    background-color: #fff;
  }
  .btn {
    height: 81rpx;
    line-height: 81rpx;
    background: #63baa6;
    text-align: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>