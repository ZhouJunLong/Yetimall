<template>
  <view class="wrap">
    <view class="head">
      <view class="head-search">
        <view class="head-search-input">
          <text class="iconfont icon-sousuo"></text>
          <input type="text"
                 placeholder="请输入搜索内容"
                 placeholder-style="color: #8B8B8B;font-size: 24rpx;" />
        </view>
        <view class="head-search-all"
              @click="jumpCelebrity">
          <view class="all-top">ALL</view>
          <view class="all-bottom">切换</view>
        </view>
      </view>
    </view>
    <view class="container">
      <view class="container-top">
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
        <view class="container-top-banner">
          <image class="banner"
                 src="../../static/temp/shop-celebrity-banner.png"></image>
        </view>
      </view>
      <!-- 排行榜 -->
      <home-rank></home-rank>
      <view class="container-shop">
        <!-- logo 安全保障 -->
        <home-shop-safe></home-shop-safe>
        <!-- 排序header -->
        <home-shop-header></home-shop-header>
        <!-- 商品列表 -->
        <view class="shop-goods">
          <good-card v-for="(item,index) in 10"
                     :key="index"></good-card>
        </view>
      </view>
    </view>

  </view>
</template>
<script>
import goodCard from '../components/goods-card.vue'
import homeShopHeader from '../components/home-shop-header'
import homeShopSafe from '../components/home-shop-safe.vue'
import homeRank from '../components/home-rank.vue'

export default {
  data() {
    return {
      active: 1,
      info: 'test',
      style1: 'font-size:40rpx',
      style2: 'font-size:26rpx',
      tabList: [
        { id: 1, name: '推荐' },
        { id: 2, name: '专辑' },
        { id: 3, name: '写真' },
        { id: 4, name: '摄影' },
        { id: 5, name: '周边' },
        { id: 6, name: '杂志' },
        { id: 7, name: 'TV' },
        { id: 8, name: '书籍' },
        { id: 9, name: '推荐' },
        { id: 10, name: '推荐' },
      ],
    }
  },
  components: {
    'good-card': goodCard,
    'home-shop-header': homeShopHeader,
    'home-shop-safe': homeShopSafe,
    'home-rank': homeRank,
  },
  methods: {
    onChange(event) {
      this.active = event.detail.index
    },
    jumpCelebrity() {
      uni.navigateTo({
        url: '/pages/home/celebrity?back=1',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  margin-bottom: 100rpx;
}
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 64rpx;
  background-color: #ffffff;
  z-index: 1000;
  padding-left: 28rpx;
  padding-right: 28rpx;
  padding-bottom: 37rpx;
  .head-search {
    margin-top: 64rpx;
    display: flex;
    .head-search-input {
      box-sizing: border-box;
      border-radius: 5rpx 5rpx 5rpx 5rpx;
      background-color: #f5f5f8;
      padding-left: 20rpx;
      width: 614rpx;
      display: flex;
      .iconfont {
        font-size: 30rpx;
        align-self: center;
      }
      input {
        border: none;
        padding: 5px;
        align-self: center;
      }
    }
    .head-search-all {
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .all-top {
        font-size: 36rpx;
        font-family: HelveticaNeueLT-77BdCn, HelveticaNeueLT;
        color: #252525;
        font-weight: bold;
      }
      .all-bottom {
        font-family: PingFang-SC-Medium, PingFang-SC;
        color: #8b8b8b;
        font-size: 22rpx;
      }
    }
  }
}
.container {
  position: relative;
  margin-top: 240rpx;
  width: 100%;
  color: #fff;
  font-size: 30rpx;
  background-color: #fff;
  .active-class {
    font-size: 40rpx;
  }
  .container-top {
    padding-left: 28rpx;
    padding-right: 28rpx;
    .container-top-banner {
      margin-top: 20rpx;
      width: 100%;
      height: 231rpx;
      background-color: gray;
      .banner {
        width: 100%;
        height: 100%;
      }
    }
  }

  .container-shop {
    background-color: #f3f6f9;
    .shop-goods {
      //   padding-left: 8rpx;
      padding-right: 8rpx;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>