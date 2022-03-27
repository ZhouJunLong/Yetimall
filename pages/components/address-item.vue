<template>
  <view v-if="itemData">
    <view class="address-item">
      <view class="item-top">
        <view class="top-left"
              @click="selecAddressItem">
          <view class="item-icon">{{ itemData.name[0] }}</view>
          <view class="item-info">
            <view class="info-top">
              <view class="item-name">{{ itemData.name }}</view>
              <view class="item-phone">{{ itemData.phone }}</view>
            </view>
            <view class="info-bottom">
              <view class="info-bottom-def"
                    v-if="itemData.isDefault">默认</view>
              <view class="info-bottom-address">{{ itemData.address + ' ' +itemData.addressDetail }}</view>
            </view>
          </view>
        </view>
        <view class="top-right">
          <view class="line"></view>
          <image class="edit"
                 @click="editAddress()"
                 :src="local_url+'home/edit-icon.png'"></image>
        </view>
      </view>
      <view class="item-bottom">
        <view class="item-bottom-left"
              @click="setDefaultAddress">
          <!-- <image class="select selected"></image> -->
          <image class="select"
                 :src="itemData.isDefault ? local_url+'home/selected-icon.png' : local_url+'home/no-selected-icon.png'"></image>
          <view class="text">默认地址</view>
        </view>
        <view class="item-bottom-right"
              @click="deleteAddress">删除</view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CONFIG from '@common/config.js'
export default {
  name: 'addressItem',
  props: {
    itemData: {
      type: Object,
      value: null,
    },
  },
  data() {
    return {
      local_url: CONFIG.LOACL_URL,
    }
  },
  computed: {},
  methods: {
    ...mapActions(['addressList', 'addressDelete', 'setAddressDefault']),
    ...mapMutations(['setStateByKey']),
    editAddress() {
      uni.navigateTo({
        url: '/pages/home/addNewAddress?addressId=' + this.itemData.id,
      })
    },
    async setDefaultAddress() {
      uni.showLoading()
      let params = {
        id: this.itemData.id,
        isDefault: this.itemData.isDefault === 1 ? 0 : 1,
      }
      let res = await this.setAddressDefault(params)
      uni.hideLoading()
      if (res) {
        this.$emit('setDefault')
      }
    },
    async deleteAddress() {
      let res = await this.addressDelete(this.itemData.id)
      if (res) {
        uni.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
        })
        this.$emit('delete')
      }
    },
    selecAddressItem() {
      this.$emit('selecAddressItem')
    },
  },
}
</script>
<style lang="scss" scoped>
.address-item {
  padding: 11rpx 37rpx 0rpx 35rpx;
  background-color: #fff;
  margin-bottom: 13rpx;
  .item-top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 17rpx;
    .top-left {
      display: flex;
      align-items: center;
      flex: 1;
      max-width: 668rpx;
      .item-icon {
        min-width: 70rpx;
        width: 70rpx;
        height: 70rpx;
        background: #f6f5fa;
        border-radius: 50%;
        text-align: center;
        line-height: 70rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #8b8b8b;
        margin-right: 15rpx;
      }
      .item-info {
        display: flex;
        flex-direction: column;

        .info-top {
          display: flex;
          align-items: center;
          font-family: PingFang SC;
          color: #252525;
          .item-name {
            font-size: 28rpx;
            font-weight: bold;
            margin-right: 31rpx;
          }
          .item-phone {
            font-size: 28rpx;
            font-weight: 500;
            color: #8b8b8b;
          }
        }
        .info-bottom {
          display: flex;
          align-items: center;
          font-family: PingFang SC;
          margin-top: 25rpx;
          .info-bottom-def {
            min-width: 50rpx;
            height: 28rpx;
            background: #f6f5fa;
            border-radius: 5rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #8b8b8b;
            text-align: center;
            line-height: 28rpx;
            margin-right: 12rpx;
          }
          .info-bottom-address {
            font-size: 22rpx;
            font-weight: 500;
            color: #252525;
          }
        }
      }
    }
    .top-right {
      // margin-left: auto;
      display: flex;
      align-items: center;
      .line {
        width: 1px;
        height: 40px;
        background: #e8e8e8;
      }
      .edit {
        margin-left: 20rpx;
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
  .item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang SC;
    height: 87rpx;
    .item-bottom-left {
      display: flex;
      align-items: center;

      .select {
        width: 20rpx;
        height: 20rpx;
        margin-right: 9rpx;
      }
      .text {
        font-size: 24rpx;
        font-weight: 500;
        color: #8b8b8b;
      }
    }
    .item-bottom-right {
      font-size: 22rpx;
      font-weight: 500;
      color: #8b8b8b;
    }
  }
}
</style>