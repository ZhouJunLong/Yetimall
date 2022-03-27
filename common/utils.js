/*
 * @Author: your name
 * @Date: 2022-03-26 22:18:50
 * @LastEditTime: 2022-03-27 20:24:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Yetimall/common/utils.js
 */
import API  from './api'
import tools from '@common/tools.js'
import store from '../store'
function WXlogin(userInfo){
    uni.login({
        success: async function(res) {
            console.log('---res---',res);
            if(res.code){
               let data = {
                    code:res.code,
                    nickName:userInfo.nickName || '',
                    photo: userInfo.avatarUrl || userInfo.photo || ''
                }
                let loginData = await tools.httpClient(API.LOGIN_WX,data)
                if(loginData){
                    store.commit('setUserInfo',loginData)
                    uni.navigateBack(-1)
                }
            }
        }
    })
}

function wxPay(payInfo){
    return new Promise((resolve,reject) =>{
        uni.requestPayment({
            'timeStamp': payInfo.timeStamp,
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.package,
            'signType': payInfo.signType,
            'paySign': payInfo.paySign,
            'success': function (res) {
                uni.showToast({
                    title: '支付成功',
                    icon: 'success',
                    success: function () {
                        resolve(true)
                    }
                })
            },
            fail(err){
                console.log('---err---',err);
                uni.showToast({
                    title: '支付失败',
                    icon: 'none',
                    success: function () {
                        resolve(false)
                    }
                })
            }
        })
    })
}
// 需要授权的话，需要弹窗先授权，需要手机号的话需要弹窗 绑定手机号
function interceptTap(isAuthorize = true,isPhone = false){
    if(isAuthorize && !store.getters.isAuthorize){
        tools.showLoginToast()
        return false
    }
    if(isPhone && !store.getters.loginInfo.phone){
        tools.showPhoneToast()
        return false
    }
    return true
}

module.exports = {
    WXlogin,
    wxPay,
    interceptTap
}


