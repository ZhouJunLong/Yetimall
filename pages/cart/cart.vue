<template>
  <view class="container">
    <view class="cart-list">
      <cart-item v-for="(item) in cartList"
                 :key="item.id"
                 :cartItem="item"
                 @delGoodsCart='delGoodsCartHandle'
                 @changeCartData='changeCartDataHandle'
                 @selectedItem='selectedItemHandle'></cart-item>
    </view>
    <cart-bottom-btn :isDelete='isDelete'
                     :totalCartInfo='totalCartInfo'
                     :isSelectedAll='isSelectedAll'
                     :pricePreferential='pricePreferential'
                     :goods_counts='goods_counts'
                     :totalPrice='totalPrice'
                     @selectAll='selectAllHandle'
                     @submitOrder='submitOrderHander'></cart-bottom-btn>
  </view>
</template>
<script>
import cartItem from '../components/cart/cart-item.vue'
import cartBottomBtn from '../components/cart/cart-bottom-btn.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    'cart-item': cartItem,
    'cart-bottom-btn': cartBottomBtn,
  },
  data() {
    return {
      isDelete: false,
      pageNum: 1, //分页
      cartList: [],
      isLastPage: false, //是否是最后一页
      isLoading: false, //是否正在加载中
      selectedList: [],
      isSelectedAll: false, // 是否全选
      goods_counts: 0,
      totalPrice: 0,
      pricePreferential: 0,
    }
  },
  computed: {
    totalCartInfo() {
      let totalPrice = 0
      let totalCount = 0
      this.selectedList.forEach((item) => {
        totalCount += item.goodsCount
        totalPrice += item.price * item.goodsCount
      })
      return { totalPrice, totalCount }
    },
  },
  watch: {
    totalCartInfo(newVal) {
      if (newVal) {
        this.getTotoaData()
      }
    },
  },
  onLoad() {},
  async onShow() {
    this.pageNum = 1
    await this.getListData()
  },
  methods: {
    ...mapActions([
      'getGoodsCartList',
      'delGoodsCart',
      'setGoodsCartCount',
      'getCartBottom',
    ]),
    async getTotoaData() {
      let cartIdList = []
      uni.showLoading({ title: '加载中' })
      this.selectedList.forEach((item) => {
        if (item.selected) {
          cartIdList.push(item.id)
        }
      })
      let params = {
        cartIdList,
      }
      if (!cartIdList.length) {
        this.goods_counts = 0
        this.totalPrice = 0
        this.pricePreferential = 0
        uni.hideLoading()
        return
      }
      let res = await this.getCartBottom(params)
      if (res) {
        this.goods_counts = res.goods_counts
        this.totalPrice = res.price
        this.pricePreferential = res.pricePreferential
      }
      uni.hideLoading()
    },
    // 提交订单
    async submitOrderHander() {
      let cartIdList = []
      this.selectedList.forEach((item) => {
        if (item.selected) {
          cartIdList.push(item.id)
        }
      })
      let params = {
        cartIdList,
      }
      if (cartIdList.length) {
        uni.setStorageSync('orderConfirmInfo', params)
        uni.navigateTo({
          url: '/pages/home/confirmOrder?isFromCart=' + 1,
        })
      }
    },
    // 要保证数据刷新，之前的选中的仍然是选中状态
    async getListData() {
      let res = await this.getGoodsCartList(this.pageNum)
      if (res) {
        this.isLastPage = res.isLastPage
        if (this.pageNum === 1) {
          this.cartList = res.list
          this.$forceUpdate()
        } else {
          this.cartList = [...this.cartList, ...res.list]
        }
        this.selectedList.forEach((selectItem) => {
          this.cartList.forEach((item) => {
            if (item.id === selectItem.id) {
              item.selected = true
            }
          })
        })
        this.selectedList = this.cartList.filter((item, index) => {
          return item.selected
        })
      }
    },
    selectedItemHandle(cartId) {
      let changeItemIndex = this.cartList.findIndex((item) => {
        return item.id === cartId
      })
      if (changeItemIndex > -1) {
        let item = this.cartList[changeItemIndex]
        item.selected = !item.selected
        this.$set(this.cartList, changeItemIndex, item)
        this.selectedList = this.cartList.filter((item, index) => {
          return item.selected
        })
        if (this.selectedList.length === this.cartList.length) {
          this.isSelectedAll = true
        } else {
          this.isSelectedAll = false
        }
      }
    },
    // 更改数量 两个数组都要更新，这里不再重新请求了
    async changeCartDataHandle(id, count) {
      let res = await this.setGoodsCartCount({ id, count })
      if (res) {
        let changeItemIndex = this.cartList.findIndex((item) => {
          return item.id === id
        })
        if (changeItemIndex > -1) {
          this.cartList[changeItemIndex].goodsCount = count
        }
        let selectedItemIndex = this.selectedList.findIndex((item) => {
          return item.id === id
        })
        if (selectedItemIndex > -1) {
          this.selectedList[selectedItemIndex].goodsCount = count
        }
      }
    },
    async delGoodsCartHandle(ids) {
      let res = await this.delGoodsCart(ids)
      if (res) {
        uni.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
        })
        this.pageNum = 1
        this.getListData()
      }
    },
    selectAllHandle(selected) {
      this.cartList.map((item) => {
        item.selected = selected
      })
      this.selectedList = selected ? this.cartList : []
      this.$forceUpdate()
      this.isSelectedAll = selected
    },
  },
  onReachBottom: function () {
    if (!this.isLastPage && !this.isLoading) {
      this.pageNum = this.pageNum + 1
      this.getListData()
    }
  },
  onPullDownRefresh: function () {
    //下拉刷新
    this.pageNum = 1
    this.getListData()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
}
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 150rpx;
  .cart-list {
    margin-top: 2rpx;
  }
}
</style>