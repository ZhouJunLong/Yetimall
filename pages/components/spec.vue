<template>
  <view class="spec-container">
    <view class="header">
      <view class="header-left">
        <image class="header-pic"
               :src="currentPropertyItem.imgUrl || '../../static/temp/rank-shop.png'"></image>
        <view class="header-info">
          <view class="header-price">
            <view class="price-icon">¥</view>
            <view class="price-num">{{currentPropertyItem.price}}</view>
          </view>
          <view class="info-des">{{currentPropertyItem.propertyText}}</view>
        </view>
      </view>
      <image class="close-icon"
             @click="close"
             src='../../static/images/home/close.png'></image>
    </view>
    <scroll-view class="scroll-wrap"
                 :scroll-y="true">
      <view class="spec-list">
        <view class="spec-item"
              :class="currentPropertyId === item.id ? 'spec-item-active':''"
              v-for="(item,index) in goodsPropertyList"
              :key="index"
              @click="selectSpecItem(item)">
          <image class="item-img"
                 :src="item.imgUrl || '../../static/temp/rank-shop.png'"></image>
          <view class="item-title">{{item.propertyText}}</view>
          <view class="price">¥{{item.price}}</view>
        </view>
      </view>
      <view class="add-wrap">
        <view class="title">加购商品</view>
        <view class="add-list">
          <view class="add-item"
                @click="selectAddVo(item,index)"
                v-for="(item,index) in goodsListInfoVoList"
                :key="index">
            <view class="item-left">
              <image class="item-img"
                     src='../../static/temp/rank-shop.png'></image>
              <view class="item-info">
                <view class="item-title">{{item.name}}</view>
                <view class="item-num">一件 x{{ item.inventory }}</view>
                <view class="item-price">¥{{item.price}}</view>
              </view>
            </view>
            <view class="item-right">
              <image class="no-selected"
                     :src="item.selected ? '../../static/images/home/selected-icon.png' : '../../static/images/home/no-selected-icon.png'"></image>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="bottom">
      <view class="btn"
            @click="gotoBuy">立即购买</view>
    </view>
  </view>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'spec',
  props: {
    goodsId: {
      type: Number,
      value: 0,
    },
    isStandard: {
      type: Boolean,
      value: 0,
    },
  },
  data() {
    return {
      goodDetail: null,
      goodsListInfoVoList: [],
      goodsPropertyList: [],
      currentPropertyId: 0,
      currentPropertyItem: null,
      addVoList: [],
    }
  },
  computed: {
    ...mapState(['orderConfirmInfo']),
  },
  methods: {
    ...mapActions(['getGoodsProperty', 'orderConfirm']),
    ...mapMutations(['setStateByKey']),
    close() {
      this.$emit('close')
    },
    selectSpecItem(item) {
      this.currentPropertyId = item.id
      this.currentPropertyItem = item
    },
    selectAddVo(item, index) {
      if (item.selected) {
        item.selected = false
      } else {
        item.selected = true
      }
      this.$set(this.goodsListInfoVoList, index, item)
      this.addVoList = this.goodsListInfoVoList.filter((item) => {
        return item.selected
      })
    },
    async gotoBuy() {
      let addList = []
      this.addVoList.forEach((item) => {
        let obj = {
          count: 1,
          id: item.id,
        }
        addList.push(obj)
      })
      let params = {
        additionalOrderGoodsList: addList || [],
        orderGoodsList: [
          {
            count: 1,
            goodsPropertyId: this.currentPropertyItem.id,
            id: this.currentPropertyItem.goodsId,
          },
        ],
      }
      this.$emit('gotoBuy', params)
    },
  },
  async created() {
    let res = await this.getGoodsProperty(this.goodsId)
    this.goodsListInfoVoList = res.goodsListInfoVoList || []
    this.goodsPropertyList = res.goodsPropertyList || []
    this.currentPropertyId = this.goodsPropertyList[0].id
    this.currentPropertyItem = this.goodsPropertyList[0]
    console.log('---Property---', res)
  },
}
</script>
<style lang="scss" scoped>
.mode {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
}
.spec-container {
  font-family: PingFang SC;
  color: #252525;
  // position: fixed;
  height: 900rpx;
  width: 100%;
  position: relative;
  // z-index: 10;
  // bottom: 0;
  // left: 0;
  // right: 0;
  background-color: #fff;
  .header {
    box-sizing: border-box;
    padding: 20rpx 21rpx 39rpx 21rpx;
    width: 100%;
    height: 197rpx;
    display: flex;
    justify-content: space-between;
    .header-left {
      display: flex;
      align-items: center;
      .header-pic {
        width: 138rpx;
        height: 138rpx;
        margin-right: 21rpx;
      }
      .header-info {
        .header-price {
          display: flex;
          align-items: flex-end;
          .price-icon {
            font-weight: bold;
            font-size: 24rpx;
            line-height: 24rpx;
            margin-right: 2rpx;
          }
          .price-num {
            font-size: 46rpx;
            font-weight: bold;
            line-height: 40rpx;
          }
        }
        .info-des {
          font-size: 22rpx;
        }
      }
    }
    .close-icon {
      width: 30rpx;
      height: 30rpx;
    }
  }
}
.scroll-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 561rpx;
  background-color: #f3f3f4;
  //   padding: 30rpx 21rpx 45rpx 21rpx;
  .spec-list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 21rpx;
    padding-right: 21rpx;
    .spec-item-active {
      border: 4rpx solid #252525;
    }
    .spec-item {
      &:nth-child(3n) {
        margin-right: 0;
      }
      width: 168rpx;
      box-sizing: border-box;
      margin-top: 30rpx;
      margin-right: 100rpx;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 28rpx 5rpx 44rpx 5rpx;
      border-radius: 5rpx;

      .item-img {
        width: 92rpx;
        height: 112rpx;
      }
      .item-title {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #252525;
        margin-top: 18rpx;
      }
      .price {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #252525;
      }
    }
  }
  .add-wrap {
    font-family: PingFang SC;
    color: #252525;
    margin-top: 44rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    margin-bottom: 45rpx;
    .title {
      font-size: 24rpx;
      font-weight: bold;
    }
    .add-list {
      margin-top: 24rpx;
      //   background-color: #fff;
      .add-item {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding: 8rpx;
        padding-right: 30rpx;
        .item-left {
          display: flex;
          align-items: center;
          .item-img {
            width: 120rpx;
            height: 120rpx;
          }
          .item-info {
            .item-title {
              font-size: 24rpx;
              font-weight: bold;
            }
            .item-num {
              font-size: 22rpx;
              font-weight: 500;
              color: #8b8b8b;
            }
            .item-price {
              font-size: 24rpx;
              font-weight: bold;
            }
          }
        }
        .item-right {
          width: 28rpx;
          height: 28rpx;
          .no-selected {
            width: 28rpx;
            height: 28rpx;
          }
        }
      }
    }
  }
}
.bottom {
  box-sizing: border-box;
  width: 100%;
  height: 150rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34rpx 16rpx;
  .btn {
    width: 100%;
    text-align: center;
    height: 81rpx;
    background: #0183fc;
    line-height: 81rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>