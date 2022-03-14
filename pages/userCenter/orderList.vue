<template>
  <view class="container">
    <van-tabs color='#0183FC'
              :active="active"
              line-width='38rpx'
              @change="onChange">
      <van-tab v-for="(item,index) in tabList"
               :key="index"
               :titleStyle="(index === active) ? style1 : style2"
               :title="item.name">
      </van-tab>
    </van-tabs>
    <view class="list">
      <order-item v-for="(item,index) in orderList"
                  :key="index"
                  :orderItem='item'></order-item>
    </view>
  </view>
</template>
<script>
import orderItem from '../components/user/order-item.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    'order-item': orderItem,
  },
  data() {
    return {
      active: 0,
      tabList: [
        { state: 100, name: '全部' },
        { state: 0, name: '待付款' },
        { state: 1, name: '待发货' },
        { state: 2, name: '待收货' },
      ],
      pageNum: 1, //分页
      isLastPage: false, //是否是最后一页
      isLoading: false, //是否正在加载中
      orderList: [],
      currentState: 100, //100全部、0待付款、1待发货、2待收货 ,
    }
  },
  onReachBottom: function () {
    if (!this.isLastPage && !this.isLoading) {
      this.pageNum = this.pageNum + 1
      this.getOrderListData()
    }
  },
  onPullDownRefresh: function () {
    //下拉刷新
    this.pageNum = 1
    this.getOrderListData()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  onLoad(query) {
    this.currentState = +query.state
    let index = this.tabList.findIndex((item) => {
      return item.state === this.currentState
    })
    if (index > -1) {
      this.active = index
      this.pageNum = 1
      this.getOrderListData()
    }
  },
  methods: {
    ...mapActions(['getOrderList']),
    async getOrderListData() {
      uni.showLoading({ title: '加载中' })
      let res = await this.getOrderList({
        orderState: this.currentState,
        pageNum: this.pageNum,
      })
      uni.hideLoading()
      if (res) {
        this.isLastPage = res.isLastPage
        if (this.pageNum === 1) {
          this.orderList = res.list
        } else {
          this.orderList = [...this.orderList, ...res.list]
        }
      }
    },
    onChange(event) {
      let index = event.detail.index
      if (index === this.active) return
      this.orderList = []
      this.active = index
      this.currentState = this.tabList[index].state
      this.pageNum = 1
      this.getOrderListData()
    },
  },
}
</script>
<style lang="scss" scoped>
.list {
  margin-top: 13rpx;
}
</style>