const getters = {
    loginInfo:state =>{
        return state.userInfo;
    },
    isLogin:getters =>{
        return  getters.loginInfo.accessToken && getters.loginInfo.id
    },
    isAuthorize:state =>{
        // console.log(getters.loginInfo && getters.loginInfo.id);
        return !!(state.userInfo && state.userInfo.id)
    }
}
export default getters
