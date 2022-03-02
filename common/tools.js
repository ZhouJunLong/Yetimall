import CONFIG from './config.js'
const base_url = CONFIG.BASE_URL
const tools = {	
	/**
	 * request请求
	 */
	httpClient(url,data) {
		return new Promise((resolve,reject)=>{
			uni.request({
				url: base_url + url,
				data: data,
				header: {
					"Content-Type": "application/json",
					'Authorization':"Bearer " //+ openid
				},
				method: "POST",
				dataType: 'json',
				success: function ( res ) {
					if(res.statusCode === 200){
						resolve(res.data.data)
					}else{
						reject(res)
					}
				},
				fail: function ( error ) {
					reject(error)
				}
			})
		})
		
	},
	
	
	/**
	 * 判断微信授权
	 */
	isWeixinLogin() {
		var userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			return true;
		}else{
			//弹框提示
			uni.showModal({
				title: '提示',
				content: '微信授权成功即可享受该权益',
				showCancel: true,
				cancelText: '取消',
				cancelColor: '#666666',
				confirmText: '去授权',
				confirmColor: '#57D0D9',
				success: (res) => {
					if (res.confirm) {
						//用户点击去授权
						uni.navigateTo({
							url: '/pages/wxlogin/wxlogin'
						})
					} else if (res.cancel) {}
				}
			})
			return false;
		}
	},
	copy(data) {
		wx.setClipboardData({
			data: data,
			success (res) {
				uni.showToast({
					title:"复制成功",
					icon:'none',
					duration:2000
				})
			}
		  })
	},
    getSafeAreaBottom(){
		const systemInfo = wx.getSystemInfoSync()
		const { screenHeight } = systemInfo;
		const { bottom } = systemInfo.safeArea
        console.log('---2222---',bottom);
		return screenHeight - bottom
	},
	// 手机号隐藏中间四位
	formatPhone(phone){
		if(!phone)return ''
		return phone.substring(0,3) + '****' + phone.substring(7)
	}
}
module.exports = tools;