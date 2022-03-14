<template>
  <view class="bind-container">
    <view class="logo"></view>
    <image class="yeye"
           src='../../static/images/user/yeye-icon.png'></image>
    <image class="des"
           src='../../static/images/user/yeye-des.png'></image>
    <view class="mobile">
      <view class="mobile-input">
        <view class="text">+86</view>
        <input class="input"
               v-model="smsSendMobiles"
               type="text"
               maxlength="11"
               placeholder="请输入手机号码">
      </view>
      <image class="mobile-input-img"
             src='../../static/images/user/yeye-input.png'></image>

    </view>
    <view class="btn-wrap"
          @click="getSendCode">
      <text class="btn-text">获取验证码</text>
    </view>
    <image class="tips"
           src='../../static/images/user/yeye-tips.png'></image>
  </view>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      smsSendMobiles: '',
      smsSendZone: 86,
    }
  },
  methods: {
    ...mapActions(['sendCode', 'sendTest']),
    async getSendCode() {
      if (!this.smsSendMobiles || this.smsSendMobiles.length !== 11) {
        uni.showToast({
          title: '请完善手机号',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      let res = await this.sendCode(this.smsSendMobiles)
      if (res && res.smsCode) {
        this.jumpCode()
      }
    },
    jumpCode() {
      uni.redirectTo({
        url: '/pages/userCenter/phoneCode',
      })
    },
  },
}
</script>
<style>
page {
  background: #ffffff;
}
</style>

<style lang="scss" scoped>
.bind-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 168rpx;
    height: 168rpx;
    background-color: #0183fc;
    margin-top: 140rpx;
  }
  .yeye {
    width: 214rpx;
    height: 48rpx;
    margin-top: 30rpx;
  }
  .des {
    width: 335rpx;
    height: 26rpx;
    margin-top: 28rpx;
  }
  .mobile {
    margin-top: 58rpx;
    width: 516rpx;
    height: 83rpx;
    position: relative;
    .mobile-input-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 516rpx;
      height: 83rpx;
      z-index: 1;
    }
    .mobile-input {
      display: flex;
      z-index: 2;
      align-items: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      .text {
        width: 120rpx;
        height: 71rpx;
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #4860ef;
        text-align: center;
        line-height: 71rpx;
      }
      .input {
        height: 71rpx;
      }
    }
  }
  .btn-wrap {
    margin-top: 29rpx;
    width: 516rpx;
    height: 83rpx;
    background-color: #0183fc;
    border-radius: 42rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-text {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .tips {
    margin-top: 29rpx;
    width: 383rpx;
    height: 25rpx;
  }
}
</style>