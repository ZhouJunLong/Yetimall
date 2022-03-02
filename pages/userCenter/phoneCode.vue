<template>
  <view class="code-container">
    <view class="header">
      <view class="title">输入验证码</view>
      <view class="des">验证码通过短信发送至 +86 15639722647</view>
    </view>
    <view class="code-wrap">
      <view class="code-list"
            @click="handleFocus">
        <view class="code-item"
              :class="(code.length === index || code.length === 4 && index === 3) && focus ? 'input-active': ''"
              v-for="(item,index) in 4"
              :key="index">
          {{code[index] || ''}}
        </view>
      </view>
      <input class="input"
             :value="code"
             maxlength="4"
             type="number"
             :focus="focus"
             @input="handleInput"
             @blur="handleBlur">
    </view>
    <view class="re-code">
      <view v-if="!canRecode">
        <text class="text-de">重新获取验证码</text>
        <text class="text-btn">{{ timer }}s</text>
      </view>
      <view v-else>
        <text class="text-btn">获取验证码</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      focus: false,
      code: '',
      canRecode: true,
      timer: 60,
      timerId: null,
    }
  },
  computed: {},
  onLoad() {
    this.canRecode = false
    this.delayTime()
  },
  onUnload() {
    this.clearTime()
  },
  methods: {
    clearTime() {
      if (!this.timer) return
      clearInterval(this.timerId)
      this.timerId = null
    },
    delayTime() {
      this.timerId = setInterval(() => {
        this.timer = this.timer - 1
        if (this.timer <= 0) {
          this.timer = 60
          this.canRecode = true
        }
      }, 1000)
    },
    complete() {
      uni.navigateBack({ delta: 1 })
    },
    clear() {
      this.code = ''
    },
    handleFocus() {
      this.focus = true
    },
    handleInput(e) {
      this.code = e.detail.value
      if (this.code.length >= 4) {
        this.complete()
      }
    },
    handleBlur() {
      this.focus = false
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
.input-active {
  border: 1px solid orange;
}
</style>