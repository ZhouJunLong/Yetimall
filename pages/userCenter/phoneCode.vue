<template>
  <view class="code-container">
    <view class="header">
      <view class="title">{{ titleText }}</view>
      <view class="des">{{ desText }}</view>
    </view>
    <view class="before-code"
          v-if="beforeCode">
      <view class="mobile">
        <view class="mobile-input">
          <view class="text">+86</view>
          <input class="input"
                 :disabled='type===2'
                 v-model="inputPhone"
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
    </view>
    <phone-code :show='!beforeCode'
                @complete='completeHandle'></phone-code>
  </view>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import phoneCode from '@components/user/phone-code'

export default {
  components: {
    'phone-code': phoneCode,
  },
  data() {
    return {
      code: '',
      type: 1, //1登录 2旧手机号 3新手机号
      beforeCode: false, //是否是获取验证码之前的状态
      currentPhone: '', //当前获取验证码的手机号
      inputPhone: '',
    }
  },
  computed: {
    ...mapState(['sendCodeInfo']),
    titleText() {
      if (this.type === 1) {
        return '输入验证码'
      }
      if (this.type === 2 && this.beforeCode) {
        return '验证旧手机号'
      }
      if (this.type === 3 && this.beforeCode) {
        return '验证新手机号'
      }
      return '输入验证码'
    },
    desText() {
      if (this.type === 1) {
        return '验证码通过短信发送至 +86 15639722647'
      }
      if (this.type === 2 && this.beforeCode) {
        return '为保证你的账号安全，需先验证你的身份'
      }
      if (this.type === 3 && this.beforeCode) {
        return `您目前的手机号是+86 ${this.currentPhone}，您想要更改为？`
      }
      return `验证码通过短信发送至 +86 ${this.currentPhone}`
    },
  },
  onLoad(query) {
    this.type = +query.type || 1
    if (this.type === 2) {
      const tokenInfo = uni.getStorageSync('tokenInfo')
      this.currentPhone = tokenInfo.telephone
      this.inputPhone = tokenInfo.telephone
      this.beforeCode = true
    }
  },
  methods: {
    ...mapActions(['login']),
    getSendCode() {
      // 发送验证码
      this.beforeCode = false
    },
    async completeHandle(code) {
      if (this.type === 1) {
        let res = await this.login(code)
        if (res) {
          uni.navigateBack({ delta: 1 })
        }
      } else if (this.type === 2) {
        this.type = 3
        this.beforeCode = true
        this.currentPhone = this.inputPhone
        this.inputPhone = ''
      } else {
        uni.navigateBack({ delta: 1 })
      }
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
.code-container {
  padding-left: 29rpx;
  padding-right: 29rpx;
  .header {
    margin-top: 91rpx;
    .title {
      font-size: 48rpx;
      font-weight: bold;
    }
    .des {
      margin-top: 33rpx;
      font-size: 23rpx;
      color: #8b8b8b;
    }
  }
  .code-wrap {
    position: relative;
    min-height: 208rpx;
    .code-list {
      //   width: 100%;
      top: 0;
      left: 0;
      right: 0;
      position: absolute;
      margin-top: 59rpx;
      display: flex;
      align-items: center;
      padding-left: 121rpx;
      padding-right: 121rpx;
      justify-content: space-between;
      .code-item {
        // margin-right: 52rpx;
        text-align: center;
        line-height: 88rpx;
        width: 88rpx;
        height: 88rpx;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACwCAYAAACvt+ReAAAE9UlEQVR4Xu3XQYocZQAF4PcTjKkCL6ABQYMXcOUtDCZuQm4guDJBDyA6btx4g6ycxOBBxLWQgAFzAZGqYUIo6RCGMWSVIYMv/TXMppmqev97H033yEte27ZdXNf10yS7v0+SvJvk4sv+13saeE0N/JPkryS/J7k/TdOvY4zjF581XnxjWZarSQ6SXHlNwdxWA6/SwIMkt+d5/uX0xSeAt227sK7rt0luvcrdXaOBc2rgYJqmb8YYT3fPOwG8LMv38J7TBB5z1gYO5nm+fQJ4WZZrSQ7PelfXa+AcG7g+z/Pd8fwH28Mkl8/x4R6lgbM28Hiapg/Guq43tm27c9a7uV4D593AGOPmWJZl99Vh9xXCSwNtDdzbAf4zyfttyeXVQJJHO8BHSd5WhwYKGzjeAd4Kg4usgWcNAAxCdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUNwBw9XzCA8xAdQMAV88nPMAMVDcAcPV8wgPMQHUDAFfPJzzADFQ3AHD1fMIDzEB1AwBXzyc8wAxUN7AD/HeSd6pPIfy+NnC8A/xHko/2tQHnrm7g0Q7wYZJr1ccQfl8buDfWdb2xbdudfW3AuXsbGGPcHNu2XVzX9WGSy71HkXwPG3g8TdOHY3fwZVmuJ/l5D0tw5N4GPp/n+fAZ4OeID5J81XseyfeogR/meb61O+8J4G3bLqzr+mOSL/aoCEfta+CnaZq+HGM8/Q/gU5/EnyX5LsmVvrNJ/AY38CDJ1/M83z19xpNP4NNv7n7YHR0dXd+27WqSj5O8l+StN7gcR/v/NfAkyeMkv40x7l+6dOlwjHH8Ysx/AWqH5cpPss3/AAAAAElFTkSuQmCC');
      }
    }
    .input {
      width: 100%;
      height: 100%;
      position: relative;
      left: -9999px;
    }
  }
  .re-code {
    font-size: 26rpx;
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: center;
    .text-de {
      color: #8b8b8b;
    }
    .text-btn {
      color: #4860ef;
    }
  }
}
.before-code {
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

.input-active {
  border: 1px solid orange;
}
</style>