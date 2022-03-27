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
    <view class="list"
          v-if="active === 0">
      <coupon-item :couponItem='item'
                   v-for="item in couponList"
                   :key="item.id"
                   :couponId='couponId'
                   @selectCoupon='selectCouponHandle'></coupon-item>
    </view>
    <view class="list"
          v-else>
      <coupon-item :couponItem='item'
                   v-for="item in disableList"
                   :key="item.id"></coupon-item>
    </view>
  </view>
</template>
<script>
import couponItem from '@components/user/coupon-item'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
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
      couponList: [],
      isLastPage: false, //是否是最后一页
      isLoading: false, //是否正在加载中
      amount: 0,
      disableList: [],
      couponId: null,
    }
  },
  onLoad(query) {
    if (query.amount) {
      this.amount = query.amount
    }
    if (query.couponId) {
      this.couponId = query.couponId
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
      this.pageNum = 1
    },
    async getList() {
      let params = {
        amount: this.amount,
        pageNum: this.pageNum,
      }
      let res = await this.getCouponList(params)

      if (res && res.list.length) {
        if (this.pageNum === 1) {
          this.couponList = []
          this.disableList = []
        }
        res.list.forEach((item) => {
          // 是否可用
          let isAble = true
          if (item.isUse === 2) {
            item.reason = '不可用原因：已使用'
            isAble = false
          }
          let date = new Date()
          console.log(moment(item.expireDateStart).valueOf())
          let startTime = moment(item.expireDateStart).valueOf()
          let endTime = moment(item.expireDateEnd).valueOf()
          if (date < startTime) {
            item.reason = '不可用原因：未到达开始时间'
            isAble = false
          }
          if (date > endTime) {
            item.reason = '不可用原因：已过期'
            isAble = false
          }
          if (item.amountMin && this.amount && this.amount < item.amountMin) {
            item.reason = `不可用原因：消费未达到${item.amountMin}元`
            isAble = false
          }
          if (isAble) {
            item.isAble = true
            this.couponList.push(item)
          } else {
            item.isAble = false
            this.disableList.push(item)
          }
        })
        console.log('couponList', this.couponList)
        console.log('disableList', this.disableList)
      }
    },
    selectCouponHandle(couponId) {
      couponId && (this.couponId = couponId)
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
    this.pageNum = 1
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