import tools from '@common/tools.js'
import API from '@common/api.js'
/**
 * 商城首页数据
 * @param {*} param0 
 */
const getHomeInfo = async ({},categoryId = 0) =>{
    try {
        let data = categoryId ? {
            terminalType:3,
            categoryId:categoryId
        }:{
            terminalType:3
        }
       let res = await tools.httpClient(API.GET_INFO,data)
       return res
    } catch (error) {
        return false
    }
}
/**
 * 首页商品列表数据
 * @param {*} param0 
 */
 const getGoodsList = async ({},params) =>{
    try {
        let data = {
            ...params,
            pageSize:20
        }
       let res = await tools.httpClient(API.GET_GOODS_LIST,data)
       return res
    } catch (error) {
        return false
    }
}
/**
 * 商品详情数据
 * @param {*} param0 
 */
 const getGoodsDetail = async ({},goodsId) =>{
    try {
       let res = await tools.httpClient(API.GET_GOODS_INFO,{goodsId:goodsId})
       return res
    } catch (error) {
        return false
    }
}
/**
 * 商品详情规格
 * @param {*} param0 
 */
 const getGoodsProperty = async ({},goodsId) =>{
    try {
       let res = await tools.httpClient(API.GET_GOODS_PROPERTY,{goodsId:goodsId})
       return res
    } catch (error) {
        return false
    }
}
/**
 * 提交订单
 * @param {*} param0 
 */
 const orderConfirm = async ({},params) =>{
    try {
       let res = await tools.httpClient(API.ORDER_CONFIRM,params)
       return res
    } catch (error) {
        return false
    }
}
/**
 * 发送验证码
 * @param {*} param0 
 */
 const sendCode = async ({state,commit},{smsSendMobiles,smsSendZone=86}) =>{
    try {
       let res = await tools.httpClient(API.SEND_CODE,{smsSendMobiles,smsSendZone},true)
       if(res && res.smsCode){
        commit('setStateByKey',{
            smsSendMobiles,
            sendCodeInfo:res
        })
       }
       return res
    } catch (error) {
        return false
    }
}


/**
 * 登录
 * @param {*} param0 
 */
 const login = async ({state,commit},smsCode) =>{
     const username = state.smsSendMobiles
     const smsSendZone = state.smsSendZone
     const uuid = state.sendCodeInfo.uuid
    try {
       let res = await tools.httpClient(API.LOGIN,{username,uuid,smsCode,smsSendZone},true)
       if(res && res.accessToken){
        commit('setStateByKey',{
            tokenInfo:res
        })
        uni.setStorageSync('tokenInfo',res);
        commit('setStateByKey',{
            sendCodeInfo:null
        })
       }
       return res
    } catch (error) {
        return false
    }
}
/**
 * 上传图片
 * @param {*} param0 
 */
 const upload = async ({state,commit},params) =>{
    try {
       let res = await tools.uploadImage(API.UP_LOAD_IMG,params,true)
       return res
    } catch (error) {
        return false
    }
 }
 /**
 * 新增地址
 * @param {*} param0 
 */
  const addressAdd = async ({state,commit},params) =>{
    try {
       let res = await tools.httpClient(API.ADDRESS_ADD,params,true)
       return true
    } catch (error) {
        return false
    }
 }
 /**
  * 地址列表
  * @param {*} param0 
  */
  const addressList = async ({state,commit},pageNum) =>{
    const tokenInfo = uni.getStorageSync('tokenInfo')
    let data = {
        pageNum,
        userId:tokenInfo.id,
        pageSize:20
    }
     try {
        let res = await tools.httpClient(API.ADDRESS_LIST,data,true)
        return res
     } catch (error) {
        return false
     }
  }
/**
  * 地址列表
  * @param {*} param0 
  */
    const addressDelete = async ({state,commit},id) =>{
         try {
            let res = await tools.httpClient(API.ADDRESS_DELETE,{id},true)
            return res
         } catch (error) {
            return false
         }
      }
/**
  * 获取默认地址
  * @param {*} param0 
  */
    const getAddressDefault = async ({state,commit},id) =>{
        const tokenInfo = uni.getStorageSync('tokenInfo')
        const userId = tokenInfo.id
         try {
            let res = await tools.httpClient(API.ADDRESS_DEFAULT,{pageNum:1,pageSize:1,userId},true)
            return res
         } catch (error) {
            return false
         }
      }
/**
  * 修改地址
  * @param {*} param0 
  */
 const addressEdit = async ({state,commit},params) =>{
    try {
       let res = await tools.httpClient(API.ADDRESS_EDIT,params,true)
       return true
    } catch (error) {
        return false
    }
 }
 /**
  * 设置默认地址
  * @param {*} param0 
  */
  const setAddressDefault = async ({state,commit},params) =>{
    try {
       let res = await tools.httpClient(API.SET_ADDRESS_DEFAULT,params,true)
       return res
    } catch (error) {
        return false
    }
 }
 /**
  * 提交订单
  * @param {*} param0 
  */
  const submitOrder = async ({state,commit},params) =>{
    try {
       let res = await tools.httpClient(API.SUBMIT_ORDER,params,true)
       return res
    } catch (error) {
        return false
    }
 }
 /**
  * 库存确认
  * @param {*} param0 
  */
  const getGoodsInventory = async ({state,commit},params) =>{
    try {
       let res = await tools.httpClient(API.GOODS_INVENTORY,params,true)
       return res
    } catch (error) {
        return false
    }
 }
 /**
  * 订单列表
  * @param {*} param0 
  */
  const getOrderList = async ({state,commit},{orderState,pageNum}) =>{
    const tokenInfo = uni.getStorageSync('tokenInfo')
    let data = {
        pageNum,
        userId:tokenInfo.id,
        pageSize:20,
        orderState
    }
    try {
       let res = await tools.httpClient(API.GET_ORDER_LIST,data,true)
       return res
    } catch (error) {
        return false
    }
 }
 /**
  * 订单列表
  * @param {*} param0 
  */
  const getOrderInfo = async ({state,commit},orderId) =>{
    const tokenInfo = uni.getStorageSync('tokenInfo')
    let data = {
        userId:tokenInfo.id,
        orderId
    }
    try {
       let res = await tools.httpClient(API.GET_ORDER_INFO,data,true)
       return res
    } catch (error) {
        return false
    }
 }
export default{
    getHomeInfo,
    getGoodsList,
    getGoodsDetail,
    getGoodsProperty,
    orderConfirm,
    sendCode,
    login,
    addressAdd,
    upload,
    addressList,
    addressDelete,
    getAddressDefault,
    addressEdit,
    setAddressDefault,
    submitOrder,
    getGoodsInventory,
    getOrderList,
    getOrderInfo
}