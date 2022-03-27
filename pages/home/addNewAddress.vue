<template>
  <view class="container">
    <view class="wrap-top">
      <view class="wrap-item">
        <view class="item-title">收货人</view>
        <input class="item-des"
               type="text"
               v-model="name"
               placeholder="请填写收货人姓名">
        <block></block>
      </view>
      <view class="wrap-item">
        <view class="item-title">联系电话</view>
        <!-- <input class="item-des" type="text" placeholder="请填写收货人姓名"> -->
        <view class="item-phone">
          <view class="item-86">+86</view>
          <input class="item-des"
                 v-model="phone"
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
          <pickerAddress @change="addressChange">{{ !addressTxt ? '请选择省市区' : addressTxt}}</pickerAddress>
        </view>
        <image class="arrow"
               :src="local_url+'home/arrow-right.png'"></image>
      </view>
      <view class="wrap-item">
        <view class="item-title">详细地址</view>
        <textarea class="item-des textarea"
                  v-model="addressDetail"
                  type="text"
                  placeholder="例如街道、门牌号、小区、楼栋号、单元 室等"></textarea>
        <block></block>
      </view>
      <view class="wrap-item wrap-toggle">
        <view class="item-title">设为默认地址</view>
        <van-switch :checked="isDefault"
                    @change="onChange"></van-switch>
      </view>
    </view>
    <view class="line"></view>
    <view class="wrap-info">
      <view class="wrap-item">
        <view class="item-title">真实姓名</view>
        <input class="item-des"
               v-model="nameReal"
               type="text"
               placeholder="请填写与身份证对应的真实姓名">
      </view>
      <view class="wrap-item">
        <view class="item-title">身份证号</view>
        <input class="item-des"
               v-model="identityCard"
               type="text"
               placeholder="请填写与真实姓名对应的身份证号">
      </view>
      <view class="wrap-card">
        <view class="card-title">身份正反面照片</view>
        <view class="card-con">
          <image class="card-img"
                 @click="uploadCard(1)"
                 :src="identityCardImgFront ? identityCardImgFront : local_url+'home/idcard-qian.png'"></image>
          <image class="card-img"
                 @click="uploadCard(2)"
                 :src=" identityCardImgBack ? identityCardImgBack : local_url+ 'home/idcard-hou.png'"></image>
        </view>
        <view class="card-tips">
          <image class="card-icon"
                 :src="local_url+'home/tips.png'"></image>
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
function toast(title) {
  uni.showToast({
    title: title,
    icon: 'none',
    duration: 1500,
  })
}
import pickerAddress from '@components/wangding-pickerAddress/wangding-pickerAddress.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import CONFIG from '@common/config.js'

export default {
  components: {
    pickerAddress,
  },
  data() {
    return {
      addressTxt: '', //所选地址
      addressDetail: '', //详细地址
      identityCard: '', //身份证号码
      identityCardImgBack: '', //身份证反面
      identityCardImgFront: '', //身份证正面
      isDefault: false, //是否默认地址
      name: '', //姓名
      nameReal: '', //真实姓名
      phone: '', //电话
      userId: '',
      zoneCode: '86', //区号 86
      id: '',
      isEdit: false,
      local_url: CONFIG.LOACL_URL,
    }
  },
  computed: {
    ...mapState(['editAddressInfo']),
  },
  onLoad(query) {
    if (query.addressId) {
      this.isEdit = true
      this.id = query.addressId
      uni.setNavigationBarTitle({
        title: '编辑地址',
      })
      this.getInfo()
    }
  },
  methods: {
    ...mapActions(['addressAdd', 'upload', 'getAddressInfo', 'addressEdit']),
    onChange({ detail }) {
      this.isDefault = detail
    },
    addressChange(data) {
      this.addressTxt = data.data.join(' ')
    },
    async getInfo() {
      let res = await this.getAddressInfo(this.id)
      if (res) {
        this.addressTxt = res.address || ''
        this.addressDetail = res.addressDetail || '' //详细地址
        this.identityCard = res.identityCard || '' //身份证号码
        this.identityCardImgBack = res.identityCardImgBack || '' //身份证反面
        this.identityCardImgFront = res.identityCardImgFront || '' //身份证正面
        this.isDefault = !!res.isDefault //是否默认地址
        this.name = res.name || '' //姓名
        this.nameReal = res.nameReal || '' //真实姓名
        this.phone = res.phone || '' //电话
        this.zoneCode = res.zoneCode || '86' //区号 86
      }
    },
    // 1正面，2反面
    async uploadCard(type) {
      let url = await this.upload()
      if (!url) return
      type === 1
        ? (this.identityCardImgFront = url)
        : (this.identityCardImgBack = url)
    },
    async saveAddress() {
      if (!this.addressTxt) {
        toast('请选择地址')
        return
      }
      if (!this.addressDetail) {
        toast('请输入详细地址')
        return
      }
      if (!this.identityCard) {
        toast('请输入身份证号码')
        return
      }
      if (!this.identityCardImgFront) {
        toast('请上传身份证正面')
        return
      }
      if (!this.identityCardImgBack) {
        toast('请上传身份证反面')
        return
      }
      if (!this.nameReal) {
        toast('请输入真实姓名')
        return
      }
      //弹框提示
      uni.showModal({
        title: '提示',
        content: '为避免无法清关，请确认身份证号码与真实姓名相匹配',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#666666',
        confirmText: '确定',
        confirmColor: '#57D0D9',
        success: (res) => {
          if (res.confirm) {
            this.saveSubmit()
          }
        },
      })
    },
    async saveSubmit() {
      let params = {
        address: this.addressTxt,
        addressDetail: this.addressDetail,
        identityCard: this.identityCard,
        identityCardImgBack: this.identityCardImgBack,
        identityCardImgFront: this.identityCardImgFront,
        isDefault: this.isDefault ? 1 : 0,
        name: this.name,
        nameReal: this.nameReal,
        phone: this.phone,
        zoneCode: this.zoneCode,
      }
      let res = false
      if (this.isEdit) {
        params.id = this.id
        res = await this.addressEdit(params)
      } else {
        res = await this.addressAdd(params)
      }
      if (res) {
        uni.navigateBack({
          delta: 1,
        })
      }
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
    background: #0183fc;
    text-align: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>