const API = {
    GET_INFO: '/shop/home/getinfo', //首页分类信息
    GET_GOODS_LIST: '/shop/home/getgoodslist',//首页商品列表
    GET_GOODS_INFO: '/shop/home/getgoodsinfo',//商品详情
    GET_GOODS_PROPERTY: '/shop/home/getgoodsinfo/property',//规格
    ORDER_CONFIRM :'/shop/order/confirm/get/info', //提交订单
    SEND_CODE: '/sms/user/send',//发送验证码
    LOGIN: '/jwt/bind/user/phone',//登录
    ADDRESS_ADD: '/user/address/add',//新增地址
    ADDRESS_EDIT: '/user/address/set',//修改地址
    UP_LOAD_IMG: '/upload/images/up', //上传图片
    ADDRESS_LIST: '/user/address/get/list',//地址列表
    ADDRESS_DELETE:'/user/address/delete',//删除地址
    ADDRESS_DEFAULT:'/user/address/get/list/default',//获取默认地址
    SET_ADDRESS_DEFAULT:'/user/address/set/default',//设置默认地址
    SUBMIT_ORDER:'/shop/order/sub',//提交订单
    GOODS_INVENTORY:'/shop/order/goods/inventory/confirm',//库存确认
    GET_ORDER_LIST:'/user/order/get/list',//订单列表
    GET_ORDER_INFO:'/user/order/get/info',//订单详情
    
    ADD_GOODS_CART:'/shop/cart/goods/add',//添加购物车
    GET_CART_LIST:'/shop/cart/getlist',//购物车列表
    DEL_CART_GOODS:'/shop/cart/goods/del',//删除购物车
    SET_CART_GOODS_COUNT:'/shop/cart/goods/set',//购物车商品修改
    SUB_CART_ORDER:'/shop/cart/order/sub',//提交购物车订单
    SUB_CART_ORDER_INFO:'/shop/cart/confirm/get/info',//提交购物车 返回订单确认信息
    GET_ADDRESS_INFO:'/user/address/get/info',//地址详情
    GET_COUPON_LIST:'/coupon/user/getlist',//优惠券列表
    GET_CART_BOTTOM :'/shop/cart/choice/goods/getprice',//购物车底部数据

    LOGIN_WX :'/jwt/login/wx',//微信登录



}
export default API