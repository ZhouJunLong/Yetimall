
function hasOwn(obj,key){
    return Object.prototype.hasOwnProperty.call(obj,key)
}
const setStateByKey =(state,data) =>{
    Object.keys(data).forEach((e)=>{
        if(hasOwn(state,e)){
            state[e] = data[e]
        }else{
            if(/\.|\[|\]/.test(e)){
                // setByKey(state,e,data[e])
            }else{
                state[e] = data[e]
            }
        }
    })
}
const setUserInfo = (state,data) => {
    state.userInfo = data
    uni.setStorageSync('userInfo', data)
}
const setUserInfoToStore = (state ) => {
   let userInfo = uni.getStorageSync('userInfo')
   if(userInfo){
    state.userInfo = userInfo
   }
}
export  default{
    setStateByKey,
    setUserInfo,
    setUserInfoToStore
} 
