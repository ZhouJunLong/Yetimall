<template>
  <view class="container">
    <view class="cart-list">
      <cart-item v-for="(item,index) in goodsList"
                 :key="index"
                 :cartItem="item"
                 @changeCartData='changeCartDataHandle'
                 @selectedItem='selectedItemHandle'></cart-item>
    </view>
    <cart-bottom-btn :isDelete='isDelete' :totalCartInfo='totalCartInfo'></cart-bottom-btn>
  </view>
</template>
<script>
import cartItem from '../components/cart/cart-item.vue'
import cartBottomBtn from '../components/cart/cart-bottom-btn.vue'

export default {
  components: {
    'cart-item': cartItem,
    'cart-bottom-btn': cartBottomBtn,
  },
  data() {
    return {
      isDelete: false,
      goodsList: [
        {
          id: 1,
          goods_name: '【圣诞礼物】CHANEL香奈儿邂逅清新EAU F RAICHE女士淡香水',
          count: 1,
          property: '50ml',
          price: '218.00',
          selected: false,
        },
        {
          id: 2,
          goods_name: '【圣诞礼物】CHANEL香奈儿邂逅清新EAU F RAICHE女士淡香水',
          count: 1,
          property: '50ml',
          price: '218.00',
          selected: false,
        },
        {
          id: 3,
          goods_name: '【圣诞礼物】CHANEL香奈儿邂逅清新EAU F RAICHE女士淡香水',
          count: 1,
          property: '50ml',
          price: '218.00',
          selected: false,
        },
      ],
    }
  },
  computed: {
    selectedList() {
      return this.goodsList.filter((item, index) => {
        return item.selected
      })
    },
    totalCartInfo() {
      let totalPrice = 0
      let totalCount = 0
      this.selectedList.forEach((item) => {
        totalCount += item.count
        totalPrice += item.price * item.count
      })
      return { totalPrice, totalCount }
    },
  },
  methods: {
    selectedItemHandle(cartId) {
      let changeItemIndex = this.goodsList.findIndex((item) => {
        return item.id === cartId
      })
      if (changeItemIndex > -1) {
        let item = this.goodsList[changeItemIndex]
        item.selected = !item.selected
        this.$set(this.goodsList, changeItemIndex, item)
      }
    },
    changeCartDataHandle(cartId, count) {
      let changeItemIndex = this.goodsList.findIndex((item) => {
        return item.id === cartId
      })
      if (changeItemIndex > -1) {
        let item = this.goodsList[changeItemIndex]
        item.count = count
        this.$set(this.goodsList, changeItemIndex, item)
      }
    },
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