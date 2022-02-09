const tools = {
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