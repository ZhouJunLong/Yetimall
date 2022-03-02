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
export default{
    getHomeInfo,
    getGoodsList
}