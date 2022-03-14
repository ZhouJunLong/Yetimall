<template>
  <view class="container">
    <view class="tips">
      <image class="icon"
             src='../../static/images/user/tips.png'></image>
      <view class="text">喜欢就抓紧下单哦~避免中意的商品下架或售罄</view>
    </view>
    <view class="list">
      <view class="item"
            v-for="(item,index) in goodsList"
            :key="index">
        <goodItemContent :orderItem='item'
                         :style="{marginTop:'0px'}"
                         @gotoPage='gotoGoodsDetail(item.id)'></goodItemContent>
      </view>
    </view>
  </view>
</template>
<script>
import goodItemContent from '../components/user/good-item-content.vue'
export default {
  components: {
    goodItemContent,
  },
  data() {
    return {
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
    gotoGoodsDetail(id) {
      uni.navigateTo({
        url: '/pages/home/goodsDeatil?id=' + id,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  .tips {
    padding-left: 40rpx;
    display: flex;
    align-items: center;
    height: 55rpx;
    .icon {
      width: 26rpx;
      height: 26rpx;
    }
    .text {
      font-size: 22rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #8b8b8b;
    }
  }
  .list {
    background-color: #fff;
    .item {
      padding: 34rpx 30rpx 36rpx;
      border-bottom: 1px solid #f0f0f0;
    }
  }
}
</style>