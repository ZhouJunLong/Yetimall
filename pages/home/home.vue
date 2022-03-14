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
      </view>
    </view>
    <view class="container">
      <view class="container-top">
        <van-tabs color='#0183FC'
                  :active="active"
                  line-width='38rpx'
                  @change="onChange"
                  v-if="showTab">
          <van-tab v-for="(item,index) in tabList"
                   :key="item.id"
                   :titleStyle="(index === activeIndex) ? style1 : style2"
                   :title="item.title"
                   :data-id='item.id'>
          </van-tab>
        </van-tabs>
        <view class="container-top-banner">
          <swiper indicator-dots="true"
                  autoplay="true"
                  interval="3000"
                  circular="true"
                  indicator-color="#848ae8"
                  indicator-active-color="#ffffff">
            <block v-for="(item, index) in 5"
                   :key="index">
              <swiper-item>
                <image class="banner"
                       src="../../static/temp/shop-celebrity-banner.png"></image>
              </swiper-item>
            </block>
          </swiper>
        </view>
      </view>
      <!-- 排行榜 -->
      <home-rank v-if="goodsBestSellingList.length > 0"
                 :rankList='goodsBestSellingList'></home-rank>
      <view class="container-shop">
        <!-- logo 安全保障 -->
        <home-shop-safe></home-shop-safe>
        <!-- 排序header -->
        <home-shop-header @goodsSort='goodsSort'
                          v-if="goodsList.length > 0"></home-shop-header>
        <!-- 商品列表 -->
        <view class="shop-goods"
              v-if="goodsList.length > 0">
          <good-card :goodItem='item'
                     v-for="(item,index) in goodsList"
                     :key="index"></good-card>
        </view>
      </view>
    </view>

  </view>
</template>
<script>
import goodCard from '@components/goods-card.vue'
import homeShopHeader from '@components/home-shop-header'
import homeShopSafe from '@components/home-shop-safe.vue'
import homeRank from '@components/home-rank.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeIndex: 0,
      info: 'test',
      style1: 'font-size:40rpx',
      style2: 'font-size:26rpx',
      tabList: [],
      goodsBestSellingList: [],
      showTab: false,
      orderByType: 0, //0=默认排序、1=价格、2=上架时间、3=销量
      orderByTypeT: 1, //1=升序、2=降序
      pageNum: 1, //分页
      goodsList: [],
      isLastPage: false, //是否是最后一页
      isLoading: false, //是否正在加载中
    }
  },
  components: {
    'good-card': goodCard,
    'home-shop-header': homeShopHeader,
    'home-shop-safe': homeShopSafe,
    'home-rank': homeRank,
  },
  computed: {
    ...mapState(['test']),
    currentCategoryId() {
      return (this.tabList.length > 0 && this.tabList[this.activeIndex].id) || 1
    },
  },
  onLoad() {
    this.getHomeData()
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
    this.getHomeData()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  methods: {
    ...mapActions(['getHomeInfo', 'getGoodsList']),
    // tab切换
    onChange(event) {
      if (this.activeIndex === event.detail.index) return
      this.activeIndex = event.detail.index
      this.getHomeData()
    },
    // 获取分类信息
    async getHomeData() {
      uni.showLoading({ title: '加载中' })
      this.isLoading = true
      let homeData = await this.getHomeInfo(this.currentCategoryId)
      this.tabList = homeData.categoryList
      this.goodsBestSellingList = homeData.goodsBestSellingList
      this.showTab = true
      this.pageNum = 1
      await this.getGoods()
      uni.hideLoading()
      this.isLoading = false
    },
    // 获取商品列表
    async getGoods() {
      let params = {
        categoryId: this.currentCategoryId,
        orderByType: this.orderByType,
        orderByTypeT: this.orderByTypeT,
        pageNum: this.pageNum,
      }
      let res = await this.getGoodsList(params)
      if (res) {
        this.isLastPage = res.isLastPage
        if (this.pageNum === 1) {
          this.goodsList = res.list
        } else {
          this.goodsList = [...this.goodsList, ...res.list]
        }
      }
    },
    goodsSort({ orderByType, orderByTypeT }) {
      this.orderByType = orderByType
      this.orderByTypeT = orderByTypeT
      this.getHomeData()
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
  padding-top: 10rpx;
  background-color: #ffffff;
  z-index: 1000;
  padding-left: 28rpx;
  padding-right: 28rpx;
  padding-bottom: 37rpx;
  .head-search {
    // margin-top: 64rpx;

    display: flex;
    .head-search-input {
      width: 100%;
      box-sizing: border-box;
      border-radius: 5rpx 5rpx 5rpx 5rpx;
      background-color: #f5f5f8;
      padding-left: 20rpx;

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
  // position: relative;
  // margin-top: 240rpx;
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
      background: #f7f7f7;
      background-size: cover;
      swiper {
        height: 231rpx;
      }
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