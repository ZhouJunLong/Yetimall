<template>
  <view class="container">
    <view class="wrap-top">
      <view class="wrap-item">
        <view class="item-title">收货人</view>
        <input class="item-des"
               type="text"
               placeholder="请填写收货人姓名">
        <block></block>
      </view>
      <view class="wrap-item">
        <view class="item-title">联系电话</view>
        <!-- <input class="item-des" type="text" placeholder="请填写收货人姓名"> -->
        <view class="item-phone">
          <view class="item-86">+86</view>
          <input class="item-des"
                 type="number"
                 placeholder="请填写收货人手机号码">
        </view>
        <block></block>
      </view>
      <view class="wrap-item">
        <view class="item-title">选择地区</view>
        <!-- <input class="item-des"
               type="text"
               placeholder="请选择收件地址（省、市、区）"> -->
        <view class="item-des">
          <pickerAddress @change="change">{{ addressTxt }}</pickerAddress>
        </view>
        <image class="arrow"
               src="../../static/images/home/arrow-right.png"></image>
      </view>
      <view class="wrap-item">
        <view class="item-title">详细地址</view>
        <textarea class="item-des textarea"
                  type="text"
                  placeholder="例如街道、门牌号、小区、楼栋号、单元 室等"></textarea>
        <block></block>
      </view>
      <view class="wrap-item wrap-toggle">
        <view class="item-title">设为默认地址</view>
        <van-switch :checked="checked"
                    @change="onChange"></van-switch>
      </view>
    </view>
    <view class="line"></view>
    <view class="wrap-info">
      <view class="wrap-item">
        <view class="item-title">真实姓名</view>
        <input class="item-des"
               type="text"
               placeholder="请填写与身份证对应的真实姓名">
      </view>
      <view class="wrap-item">
        <view class="item-title">身份证号</view>
        <input class="item-des"
               type="text"
               placeholder="请填写与真实姓名对应的身份证号">
      </view>
      <view class="wrap-card">
        <view class="card-title">身份正反面照片</view>
        <view class="card-con">
          <image class="card-img"
                 src="../../static/images/home/idcard-qian.png"></image>
          <image class="card-img"
                 src="../../static/images/home/idcard-hou.png"></image>
        </view>
        <view class="card-tips">
          <image class="card-icon"
                 src="../../static/images/home/tips.png"></image>
          <view class="tisp">身份证照片仅用于清关使用，不做其他用途</view>
        </view>
      </view>
    </view>
    <view class="btn-wrap">
      <view class="btn"
            @click="saveAddress">保存地址</view>
    </view>
  </view>
</template>
<script>
import pickerAddress from '../components/wangding-pickerAddress/wangding-pickerAddress.vue'
export default {
  components: {
    pickerAddress,
  },
  data() {
    return {
      checked: false,
      addressTxt: '请选择省市区', //所选地址
    }
  },
  methods: {
    onChange({ detail }) {
      this.checked = detail
    },
    change(data) {
      this.addressTxt = data.data.join(' ')
    },
    saveAddress() {
      uni.showToast({
        title: '地址添加成功',
        icon: 'none',
        duration: 1500,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.line {
  height: 8rpx;
  background-color: #f3f6f9;
}
.container {
  background-color: #fff;
  padding-bottom: 160rpx;
  .wrap-top {
    background-color: #fff;
    padding-left: 37rpx;
    padding-right: 37rpx;
    margin-top: 1px;
  }
  .wrap-item {
    &:last-child {
      border-bottom: 0;
    }
    display: flex;
    align-items: center;
    //   justify-content: space-between;
    color: #252525;
    padding: 33rpx 0 33rpx 0;
    border-bottom: 1px solid #e8e8e8;
    .item-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: bold;
      min-width: 95rpx;
      margin-right: 55rpx;
    }
    .item-phone {
      display: flex;
      align-items: center;
    }
    .item-86 {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #8b8b8b;
      margin-right: 30rpx;
    }
    .item-des {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: bold;
      width: 430rpx;
    }

    .textarea {
      height: 55rpx;
    }
    .arrow {
      width: 15rpx;
      height: 15rpx;
      margin-left: auto;
    }
  }
  .select-area {
    /* color: #DAE0E3; */
    font-family: PingFang SC;
    font-weight: bold;
    font-size: 24rpx;
  }
  .wrap-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wrap-info {
    margin-top: 8rpx;
    background-color: #fff;
    padding-left: 37rpx;
    padding-right: 37rpx;
    padding-bottom: 30rpx;
    .wrap-card {
      margin-top: 34rpx;
      .card-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
      }
      .card-con {
        display: flex;
        align-items: center;
        margin-top: 18rpx;
        .card-img {
          width: 334rpx;
          height: 219rpx;
        }
      }
      .card-tips {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 24rpx;
        .card-icon {
          margin-right: 8rpx;
          width: 24rpx;
          height: 24rpx;
        }
        .tisp {
          text-align: center;
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #8b8b8b;
        }
      }
    }
  }
  .btn-wrap {
    position: fixed;
    bottom: 0rpx;
    left: 0;
    right: 0;
    padding: 20rpx 17rpx 41rpx 17rpx;
    background-color: #fff;
  }
  .btn {
    height: 81rpx;
    line-height: 81rpx;
    background: #63baa6;
    text-align: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>