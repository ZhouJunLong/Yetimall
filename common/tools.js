import CONFIG from './config.js'
const base_url = CONFIG.BASE_URL
let isShowLoginToast = false
const tools = {	
	/**
	 * request请求
	 */
	httpClient(url,data,isShowToast = false) {
	 const userInfo = uni.getStorageSync('userInfo');
		return new Promise((resolve,reject)=>{
			uni.request({
				url: base_url + url,
				data: data,
				header: {
					"Content-Type": "application/json",
					'Authorization':"Bearer " + userInfo.accessToken || ''
				},
				method: "POST",
				dataType: 'json',
				success: function ( res ) {
					if(res.statusCode === 200 && res.data.statusCode === 200){
					//弹框提示
						resolve(res.data.data || '成功')
					}else{
						if(isShowToast && res.data.statusCode == 40101){
							tools.showLoginToast()
							reject(res)
							return
						}
						if(isShowToast && res.data.message){
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000,
							  })
						}
						reject(res)
					}
				},
				fail: function ( error ) {
					reject(error)
				}
			})
		})
		
	},
	uploadImage(url,isShowToast = false){
		const userInfo = uni.getStorageSync('userInfo');
		return new Promise((resolve,reject)=>{
			wx.chooseImage({
				success (res) {
				  const tempFilePaths = res.tempFilePaths
				  wx.uploadFile({
					url: base_url + url,
					filePath: tempFilePaths[0],
					header: {
						"Content-Type": "application/json",
						'Authorization':"Bearer " + userInfo.accessToken || ''
					},
					name: 'file',
					formData: {
					//   'user': 'test'
					},
					success (res){
						let data = JSON.parse(res.data)
						if(res.statusCode === 200 && data.statusCode === 200){
							resolve(data.data)
						}else{
							if(isShowToast && data.message){
								uni.showToast({
									title: res.data.message,
									icon: 'none',
									duration: 2000,
								  })
							}
							reject(res)
						}
					}
				  })
				}
			  })
		})
	},
	showLoginToast(){
		if(isShowLoginToast) return
		isShowLoginToast = true
		let userInfo = uni.getStorageSync('userInfo')
		const title = userInfo && userInfo.id ? '登录过期，请重新登录！' : '微信授权成功即可享受该权益'
		//弹框提示
		uni.showModal({
			title: '提示',
			content: title,
			showCancel: true,
			cancelText: '取消',
			cancelColor: '#666666',
			confirmText: '去登录',
			confirmColor: '#57D0D9',
			success: (res) => {
				if (res.confirm) {
					//用户点击去授权
					uni.navigateTo({
						url: '/pages/userCenter/wxlogin'
					})
					isShowLoginToast = false
				} else if (res.cancel) {
					isShowLoginToast = false
				}
			}
		})
	},
	showPhoneToast(){
		if(isShowLoginToast) return
		isShowLoginToast = true
		//弹框提示
		uni.showModal({
			title: '提示',
			content: '请绑定手机号',
			showCancel: true,
			cancelText: '取消',
			cancelColor: '#666666',
			confirmText: '去绑定',
			confirmColor: '#57D0D9',
			success: (res) => {
				if (res.confirm) {
					//用户绑定手机号
					uni.navigateTo({
						url: '/pages/userCenter/bindMobile'
					})
					isShowLoginToast = false
				} else if (res.cancel) {
					isShowLoginToast = false
				}
			}
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
		return screenHeight - bottom
	},
	// 手机号隐藏中间四位
	formatPhone(phone){
		if(!phone)return ''
		return phone.substring(0,3) + '****' + phone.substring(7)
	}
}
module.exports = tools;