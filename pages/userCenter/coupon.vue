<template>
  <view class="container">
    <van-tabs color='#0183FC'
              :active="active"
              line-width='85rpx'
              @change="onChange">
      <van-tab v-for="(item,index) in tabList"
               :titleStyle="style"
               :key="index"
               :title="item.title">
      </van-tab>
    </van-tabs>
    <view class="list">
      <coupon-item :amount='amount'
                   @selectCoupon='selectCouponHandle'></coupon-item>
    </view>
  </view>
</template>
<script>
import couponItem from '@components/user/coupon-item'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    'coupon-item': couponItem,
  },
  data() {
    return {
      active: 0,
      tabList: [
        { index: 0, title: '可用优惠券' },
        { index: 1, title: '不可用优惠券' },
      ],
      style: 'font-size:26rpx;color:#252525',
      pageNum: 0, //分页
      goodsList: [],
      isLastPage: false, //是否是最后一页
      isLoading: false, //是否正在加载中
      amount: 0,
    }
  },
  onLoad(query) {
    if (query.amount) {
      this.amount = query.amount
    }
    this.pageNum = 1
    this.getList()
  },
  methods: {
    ...mapActions(['getCouponList']),
    onChange(event) {
      let index = event.detail.index
      if (index === this.active) return
      this.active = index
    },
    async getList() {
      let params = {
        amount: this.amount,
        pageNum: this.pageNum,
      }
      let res = await this.getCouponList(params)
    },
    selectCouponHandle() {
      uni.navigateBack({
        delta: 1,
      })
    },
  },
  onReachBottom: function () {
    if (!this.isLastPage && !this.isLoading) {
      this.pageNum = this.pageNum + 1
      this.getGoods()
    }
  },
  onPullDownRefresh: function () {
    //下拉刷新
    this.pageNum = 0
    this.getList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
}
</script>
<style lang="scss" scoped>
.container {
  .list {
    padding-left: 32rpx;
    padding-right: 32rpx;
  }
}
</style>