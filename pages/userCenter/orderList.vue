<template>
  <view class="container">
    <van-tabs color='#63BAA6'
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
      <order-item v-for="(item,index) in goodsList"
                  :key="index"
                  :orderItem='item'></order-item>
    </view>
  </view>
</template>
<script>
import orderItem from '../components/user/order-item.vue'
export default {
  components: {
    'order-item': orderItem,
  },
  data() {
    return {
      active: 0,
      tabList: [
        { state: 1, name: '全部' },
        { state: 2, name: '待付款' },
        { state: 3, name: '待发货' },
        { state: 4, name: '待收货' },
      ],
      goodsList: [
        {
          id: 1,
          goods_name: '【圣诞礼物】CHANEL香奈儿邂逅清新EAU F RAICHE女士淡香水',
          count: 1,
          property: '50ml',
          price: '218.00',
          stateTitle: '交易成功',
        },
        {
          id: 2,
          goods_name: '【圣诞礼物】CHANEL香奈儿邂逅清新EAU F RAICHE女士淡香水',
          count: 1,
          property: '50ml',
          price: '218.00',
          stateTitle: '交易成功',
        },
        {
          id: 3,
          goods_name: '【圣诞礼物】CHANEL香奈儿邂逅清新EAU F RAICHE女士淡香水',
          count: 1,
          property: '50ml',
          price: '218.00',
          stateTitle: '交易成功',
        },
      ],
    }
  },
  methods: {
    onChange(event) {
      this.active = event.detail.index
    },
  },
}
</script>
<style lang="scss" scoped>
.list {
  margin-top: 13rpx;
}
</style>