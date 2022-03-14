export default{
    loginInfo:state =>{
        return uni.getStorageSync('tokenInfo');
    },
    isLogin:getters =>{
        return !!getters.loginInfo.accessToken
    }
}