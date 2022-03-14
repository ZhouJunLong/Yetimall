<template>
  <view class="container">
    <!-- 地址列表   -->
    <view class="address-list">
      <address-item v-for="(item,index) in list"
                    :itemData='item'
                    @selecAddressItem='selecAddressItemHandle(item)'
                    @delete="deleteHandle"
                    @setDefault="setDefaultHandle"
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
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      pageNum: 1, //分页
      isLastPage: false, //是否是最后一页
      isLoading: false, //是否正在加载中
      list: [],
      iscb: false, //是否需要回调到上一页
    }
  },
  components: {
    'address-item': addressItem,
  },
  onReachBottom: function () {
    if (!this.isLastPage && !this.isLoading) {
      this.pageNum = this.pageNum + 1
      this.getAddressList()
    }
  },
  onPullDownRefresh: function () {
    //下拉刷新
    this.pageNum = 1
    this.getAddressList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  onLoad(query) {
    this.pageNum = 1
    this.getAddressList()
    this.iscb = !!query.cb
  },
  onShow() {
    this.pageNum = 1
    this.getAddressList()
  },
  methods: {
    ...mapActions(['addressList']),
    ...mapMutations(['setStateByKey']),
    async getAddressList() {
      if (this.isLoading) return
      let res = await this.addressList(this.pageNum)
      this.list = res.list || []
    },
    setDefaultHandle() {
      this.pageNum = 1
      this.getAddressList()
    },
    deleteHandle() {
      this.pageNum = 1
      this.getAddressList()
    },
    addAddress() {
      uni.navigateTo({
        url: '/pages/home/addNewAddress',
      })
    },
    // 选择地址后返回上一页
    selecAddressItemHandle(item) {
      if (this.iscb) {
        this.setStateByKey({
          currentSelectedAddress: item,
        })
        uni.navigateBack({
          delta: 1,
        })
      }
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
    background: #0183fc;
    text-align: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>