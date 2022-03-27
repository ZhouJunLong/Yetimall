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
       if(res){
        commit('setStateByKey',{
            smsSendMobiles,
            smsSendZone:smsSendZone,
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
 const bindPhoneLogin = async ({state,commit},smsCode) =>{
     const phone = state.smsSendMobiles
     const smsSendZone = state.smsSendZone
     const uuid = state.sendCodeInfo.uuid
     let data = {
      phone,
      sendZone:smsSendZone,
      smsCode,
      uuid
     }
    try {
       let res = await tools.httpClient(API.LOGIN,data,true)
       if(res && res.accessToken){
        commit('setStateByKey',{
            userInfo:res
        })
        commit('setUserInfo',res)
      //   uni.setStorageSync('userInfo',res);
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
    const userInfo = uni.getStorageSync('userInfo')
    let data = {
        pageNum,
        userId:userInfo.id,
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
        const userInfo = uni.getStorageSync('userInfo')
        const userId = userInfo.id
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
   params.orderFrom = 2 // 2-小程序   3-H5
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
    const userInfo = uni.getStorageSync('userInfo')
    let data = {
        pageNum,
        userId:userInfo.id,
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
  * 订单详情
  * @param {*} param0 
  */
  const getOrderInfo = async ({state,commit},orderId) =>{
    const userInfo = uni.getStorageSync('userInfo')
    let data = {
        userId:userInfo.id,
        orderId
    }
    try {
       let res = await tools.httpClient(API.GET_ORDER_INFO,data,true)
       return res
    } catch (error) {
        return false
    }
 }
 /**
  * 添加购物车
  * @param {*} param0 
  */
  const addGoodsCart = async ({state,commit},params) =>{
    try {
       let res = await tools.httpClient(API.ADD_GOODS_CART,params,true)
       return true
    } catch (error) {
        return false
    }
 }
 /**
  * 购物车列表
  * @param {*} param0 
  */
  const getGoodsCartList = async ({state,commit},pageNum) =>{
    const userInfo = uni.getStorageSync('userInfo')
    let data = {
        pageNum,
        userId:userInfo.id,
        pageSize:20
    }
     try {
        let res = await tools.httpClient(API.GET_CART_LIST,data,true)
        return res
     } catch (error) {
        return false
     }
 }
 /**
  * 删除购物车
  * @param {*} param0 
  */
  const delGoodsCart = async ({state,commit},ids) =>{
    let data = {
       id:[...ids]
    }
     try {
        let res = await tools.httpClient(API.DEL_CART_GOODS,data,true)
        return true
     } catch (error) {
        return false
     }
 }
 /**
  * 修改购物车
  * @param {*} param0 
  */
  const setGoodsCartCount = async ({state,commit},{id,count}) =>{
    let data = {
       id,
       count
    }
     try {
        let res = await tools.httpClient(API.SET_CART_GOODS_COUNT,data,true)
        return true
     } catch (error) {
        return false
     }
 }
 /**
  * 购物车提交,返回确认订单信息
  * @param {*} param0 
  */
  const confirmCartOrderInfo = async ({state,commit},params) =>{
   try {
      let res = await tools.httpClient(API.SUB_CART_ORDER_INFO,params,true)
      return res
   } catch (error) {
      return false
   }
}
 /**
  * 购物车提交
  * @param {*} param0 
  */
  const subCartOrder = async ({state,commit},params) =>{
    
     try {
        let res = await tools.httpClient(API.SUB_CART_ORDER,params,true)
        return res
     } catch (error) {
        return false
     }
 }

 /**
  * 购物车提交
  * @param {*} param0 
  */
  const getAddressInfo = async ({state,commit},id) =>{
   const userInfo = uni.getStorageSync('userInfo')
   let data = {
      id,
      userId:userInfo.id,
   }
   try {
      let res = await tools.httpClient(API.GET_ADDRESS_INFO,data,true)
      return res
   } catch (error) {
      return false
   }
}
/**
  * 优惠券列表
  * @param {*} param0 
  */
 const getCouponList = async ({state,commit},{amount = 0,pageNum}) =>{
   const userInfo = uni.getStorageSync('userInfo')
   let data = {
      amount,
       pageNum,
       userId: 223,//userInfo.id,
       pageSize:20
   }
    try {
       let res = await tools.httpClient(API.GET_COUPON_LIST,data,true)
       return res
    } catch (error) {
       return false
    }
 }
 /**
  * 购物车底部数据
  * @param {*} param0 
  */
  const getCartBottom = async ({state,commit},params) =>{
    try {
       let res = await tools.httpClient(API.GET_CART_BOTTOM,params,true)
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
    bindPhoneLogin,
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
    getOrderInfo,
    addGoodsCart,
    getGoodsCartList,
    delGoodsCart,
    setGoodsCartCount,
    subCartOrder,
    confirmCartOrderInfo,
    getAddressInfo,
    getCouponList,
    getCartBottom
}