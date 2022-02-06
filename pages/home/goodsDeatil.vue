<template>
  <view class="container">
    <view class="header">
      <view class="header-banner">
        <image class="banner-img"
               src="../../static/temp/good-detail-pic.png"></image>
      </view>
    </view>
    <view class="detail">
      <view class="detail-info">
        <view class="info-top">
          <view class="info-top-left">
            <view class="price-icon">¥</view>
            <view class="price-num">149</view>
          </view>
          <view class="info-top-right">已售6.2万件</view>
        </view>
        <view class="info-center">
          【新年礼物】LANCOME/兰蔻菁纯柔雾哑光唇膏粉金8 88 兰蔻口红274 #可加购定制刻字##周冬雨/金晨/周 也##送女
        </view>
        <view class="info-bottom">
          截止日期倒计时 27天23:15:45
        </view>
      </view>
      <view class="celebrity-info">
        <view class="celebrity-left">
          <image class="celebrity-left-icon"
                 src="../../static/temp/shop-celebrity-icon.png"></image>
          <view class="celebrity-left-info">
            <view class="info-title">林允儿周边</view>
            <view class="info-bottom">
              7982人关注·12款商品
            </view>
          </view>
        </view>
        <image class="celebrity-right"
               src=""></image>
      </view>
      <view class="recommend-info">
        <view class="recommend-top">
          <view class="title">明星推荐</view>
          <view class="right">
            <view class="right-all">查看全部</view>
            <image class="right-icon"
                   src=""></image>
          </view>
        </view>
        <view class="recommend-list">
          <view class="recommend-item"
                v-for="(item,index) in 3"
                :key="index">
            <image class="item-img"
                   src="../../static/temp/rank-shop.png"></image>
            <view class="item-name">
              <view>林允儿</view>
              <view>同款巴宝莉香水</view>
            </view>
            <view class="item-price">¥249</view>
          </view>
        </view>
      </view>
      <view class="parameter-info">
        <view class="parameter-top">
          <view class="title">产品参数</view>
        </view>
        <view class="parameter-list">
          <view class="parameter-item">
            <view class="item-left">品牌</view>
            <view class="item-right">LANCOME/兰蔻</view>
          </view>
          <view class="parameter-item">
            <view class="item-left">主货号</view>
            <view class="item-right">兰蔻菁纯柔雾哑光唇膏</view>
          </view>
          <view class="parameter-item">
            <view class="item-left">发售价格</view>
            <view class="item-right">¥399(仅供参考）</view>
          </view>
        </view>

      </view>
    </view>
    <view class="detail-img">
      <image class="pic"
             mode='widthFix'
             src='../../static/temp/goods-detail-img1.png'></image>
      <image class="pic"
             mode='widthFix'
             src='../../static/temp/goods-detail-img2.png'></image>
      <image class="pic"
             mode='widthFix'
             src='../../static/temp/goods-detail-img3.png'></image>
    </view>
    <view class="recommend-goods">
      <view class="title-wrap">
        <view class="title-line"></view>
        <view class="title">为您推荐</view>
        <view class="title-line"></view>
      </view>
      <view class="shop-goods">
        <good-card v-for="(item,index) in 2"
                   :key="index"></good-card>
      </view>

    </view>

  </view>
</template>
<script>
import goodCard from '../components/goods-card.vue'

export default {
  components: {
    'good-card': goodCard,
  },
}
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 200rpx;
  .header {
    position: relative;
    top: 0;
    width: 750rpx;
    height: 750rpx;
    z-index: 1;
    .header-banner {
      .banner-img {
        width: 750rpx;
        height: 750rpx;
      }
    }
  }
  .detail {
    margin-left: 17rpx;
    margin-right: 17rpx;
  }
  .detail-info {
    padding: 30rpx 20rpx 26rpx 20rpx;
    position: relative;
    background-color: #fff;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    // width: 716rpx;
    // margin-left: 17rpx;
    // margin-right: 17rpx;
    margin-top: -50rpx;
    box-sizing: border-box;
    .info-top {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-top-left {
        display: flex;
        font-weight: bold;
        align-items: flex-end;
        .price-icon {
          font-size: 38rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          color: #1d1d1d;
          line-height: 38rpx;
          margin-right: 5rpx;
        }
        .price-num {
          font-size: 46rpx;
          font-family: HelveticaNeueLT-77BdCn, HelveticaNeueLT;
          color: #1d1d1d;
          line-height: 40rpx;
        }
      }
      .info-top-right {
        font-size: 22rpx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #8b8b8b;
      }
    }
    .info-center {
      margin-top: 29rpx;
      margin-bottom: 28rpx;
      font-size: 28rpx;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: #252525;
    }
    .info-bottom {
      text-align: center;
      height: 66rpx;
      width: 100%;
      font-size: 30rpx;
      font-family: FZTYSJW--GB1-0, FZTYSJW--GB1;
      font-weight: normal;
      color: #95a2be;
    }
  }
  .celebrity-info {
    padding: 27rpx 19rpx;
    background-color: #fff;
    margin-top: 12rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .celebrity-left {
      display: flex;
      align-items: center;
      .celebrity-left-icon {
        width: 78rpx;
        height: 78rpx;
        border-radius: 50%;
        margin-right: 16rpx;
      }
      .celebrity-left-info {
        .info-title {
          font-size: 24rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #252525;
        }
        .info-bottom {
          margin-top: 10rpx;
          font-size: 22rpx;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: #8b8b8b;
        }
      }
    }
    .celebrity-right {
      width: 10rpx;
      height: 18rpx;
    }
  }
  .recommend-info {
    padding: 29rpx 19rpx 50rpx 19rpx;
    background-color: #fff;
    margin-top: 12rpx;
    .recommend-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 28rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #1d1d1d;
      }
      .right {
        display: flex;
        align-items: center;
        .right-all {
          font-size: 22rpx;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: #8b8b8b;
        }
        .right-icon {
          width: 10rpx;
          height: 18rpx;
        }
      }
    }
    .recommend-list {
      display: flex;
      margin-top: 17rpx;
      //   justify-content: space-around;
      margin-left: 29rpx;
      .recommend-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 80rpx;
        .item-img {
          width: 143rpx;
          height: 143rpx;
        }
        .item-name {
          margin-top: 16rpx;
          margin-bottom: 10rpx;
          width: 161rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 22rpx;
          font-family: PingFang-SC-Medium, PingFang-SC;
          //   font-weight: 500;
          color: #252525;
        }
        .item-price {
          font-weight: bold;
          color: #252525;
          font-size: 24rpx;
        }
      }
    }
  }
  .parameter-info {
    padding: 29rpx 19rpx 41rpx 19rpx;
    background-color: #fff;
    margin-top: 12rpx;
    .parameter-top {
      .title {
        font-size: 28rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #1d1d1d;
      }
    }
    .parameter-list {
      margin-top: 22rpx;
      .parameter-item {
        font-size: 22rpx;
        font-family: PingFang-SC-Medium, PingFang-SC;
        color: #252525;
        display: flex;
        .item-left {
          width: 175rpx;
          height: 68rpx;
          padding-left: 38rpx;
        }
        .item-right {
          height: 68rpx;
          padding-left: 38rpx;
        }
      }
    }
  }
  .detail-img {
    width: 100%;
    .pic {
      width: 100%;
      //   height: 100%;
    }
  }
  .recommend-goods {
    .title-wrap {
      display: flex;
      padding-top: 28rpx;
      padding-bottom: 27rpx;
      justify-content: center;
      align-items: center;
      .title {
        font-size: 26rpx;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #8b8b8b;
      }
      .title-line {
        width: 37rpx;
        height: 4rpx;
        background: linear-gradient(
            90deg,
            #8b8b8b 0%,
            #8b8b8b 1%,
            #8b8b8b 77%,
            #8b8b8b 100%
          )
          #8b8b8b;
        border-radius: 2rpx 2rpx 2rpx 2rpx;
      }
    }
    .shop-goods {
      padding-right: 8rpx;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>