export default {
	state: {
		isUserInfoMask: false,
		isLoginBox: false,//总窗口
		isPassWordLogin: false,//密码登录窗口
		isPhoneLogin: false,//手机登录窗口
		isCustomerService: false,//客服窗口
		isWechat: false,//公众号窗口
		isEmail: false,//邮件窗口
		isEmailDetails: false,//邮件详情窗口
		isWelfare: false,//福利窗口
		isReconiseInfo: false,//实名认证窗口
		isCoupon: false,//代金券窗口
		isBindPhone: false,//绑定手机号窗口
		isPayType: false,//支付窗口
		isWallet: false,//钱包窗口
		isRegister: false,//注册窗口
		agreementShow: false,//用户协议窗口
		isExchange: false,//兑换窗口
		isRecharge: false,//充值窗口
		isAccountAndPas: false,//注册成功之后账号密码截图窗口
		isPayUrlInfo: false,//ios桌面图标下的支付弹窗
		isAccount: false,//账号中心
		isAlertPwd:false,
		pay_url: '',//ios下桌面图标打开游戏的支付链接
		isRealNameTip: false,//邀请实名提示
		isRealNameForm: false,//实名表单填写
		isTiredTip: false,//疲劳提醒--未成年
		isRelieveTiredTip: false,//疲劳提醒--解除疲劳

	},
	mutations: {
		IsUserInfoMask(state, isUserInfoMask) {
			state.isUserInfoMask = isUserInfoMask
		},
		IsLoginBox(state, isLoginBox) {
			if (isLoginBox) {
				state.isUserInfoMask = false;
				state.isPassWordLogin = false;
				state.isPhoneLogin = false;
				state.isCustomerService = false;
				state.isWechat = false;
				state.isEmail = false;
				state.isEmailDetails = false;
				state.isWelfare = false;
				state.isReconiseInfo = false;
				state.isCoupon = false;
				state.isBindPhone = false;
				state.isPayType = false;
				state.isWallet = false;
				state.isRegister = false;
				state.agreementShow = false;
				state.isExchange = false;
				state.isRecharge = false;
				state.isPayUrlInfo = false;
				state.isAccount = false;
				state.isAlertPwd = false;
				

				state.isRealNameTip = false;
				state.isRealNameForm = false;
				state.isTiredTip = false;
				state.isRelieveTiredTip = false;
			}
			state.isLoginBox = isLoginBox;
		},
		IsPassWordLogin(state, isPassWordLogin) {
			state.isPassWordLogin = isPassWordLogin
		},
		IsPhoneLogin(state, isPhoneLogin) {
			state.isPhoneLogin = isPhoneLogin
		},
		IsCustomerService(state, isCustomerService) {
			state.isCustomerService = isCustomerService
		},
		IsWechat(state, isWechat) {
			state.isWechat = isWechat

		},
		IsEmail(state, isEmail) {
			state.isEmail = isEmail
		},
		IsEmailDetails(state, isEmailDetails) {
			state.isEmailDetails = isEmailDetails
		},
		IsWelfare(state, isWelfare) {
			state.isWelfare = isWelfare

		},
		IsReconiseInfo(state, isReconiseInfo) {
			state.isReconiseInfo = isReconiseInfo
		},
		IsCoupon(state, isCoupon) {
			state.isCoupon = isCoupon
		},
		IsBindPhone(state, isBindPhone) {
			state.isBindPhone = isBindPhone
		},
		IsPayType(state, isPayType) {
			state.isPayType = isPayType
		},
		IsWallet(state, isWallet) {
			state.isWallet = isWallet
		},
		IsExchange(state, isExchange) {
			state.isExchange = isExchange
		},
		IsRecharge(state, isRecharge) {
			state.isRecharge = isRecharge
		},
		IsRegister(state, isRegister) {
			state.isRegister = isRegister
		},
		AgreementShow(state, agreementShow) {
			state.agreementShow = agreementShow
		},

		IsPayUrlInfo(state, isPayUrlInfo) {
			state.isPayUrlInfo = isPayUrlInfo
		},
		Pay_url(state, pay_url) {
			state.pay_url = pay_url
		},
		IsAccountAndPas(state, isAccountAndPas) {
			state.isAccountAndPas = isAccountAndPas
		},
		IsAccount(state, isAccount) {
			state.isAccount = isAccount
		},
		IsAlertPwd(state, isAlertPwd) {
			state.isAlertPwd = isAlertPwd
		},
		
		
		IsRealNameTip(state, isRealNameTip) {
			state.isRealNameTip = isRealNameTip
		},
		IsRealNameForm(state, isRealNameForm) {
			state.isRealNameForm = isRealNameForm
		},
		IsTiredTip(state, isTiredTip) {
			state.isTiredTip = isTiredTip
		},
		IsRelieveTiredTip(state, isRelieveTiredTip) {
			state.isRelieveTiredTip = isRelieveTiredTip
		},
	},

	actions: {
		IsUserInfoMaskFun(context, n) {
			context.commit('IsUserInfoMask', n)
		},
		IsLoginBoxFun(context, n) {
			context.commit('IsLoginBox', n)
		},
		IsPassWordLoginFun(context, n) {
			context.commit('IsPassWordLogin', n)
		},
		IsPhoneLoginFun(context, n) {
			context.commit('IsPhoneLogin', n)
		},
		IsCustomerServiceFun(context, n) {
			context.commit('IsCustomerService', n)
		},
		IsWechatFun(context, n) {
			context.commit('IsWechat', n)
		},
		IsEmailFun(context, n) {
			context.commit('IsEmail', n)
		},
		IsEmailDetailsFun(context, n) {
			context.commit('IsEmailDetails', n)
		},
		IsWelfareFun(context, n) {
			context.commit('IsWelfare', n)
		},
		IsReconiseInfoFun(context, n) {
			context.commit('IsReconiseInfo', n)
		},
		IsCouponFun(context, n) {
			context.commit('IsCoupon', n)
		},
		IsBindPhoneFun(context, n) {
			context.commit('IsBindPhone', n)
		},
		IsPayTypeFun(context, n) {
			context.commit('IsPayType', n)
		},
		IsWalletFun(context, n) {
			context.commit('IsWallet', n)
		},
		IsExchangeFun(context, n) {
			context.commit('IsExchange', n)
		},
		IsRechargeFun(context, n) {
			context.commit('IsRecharge', n)
		},
		IsRegisterFun(context, n) {
			context.commit('IsRegister', n)
		},
		AgreementShowFun(context, n) {
			context.commit('AgreementShow', n)
		},

		IsPayUrlInfoFun(context, n) {
			context.commit('IsPayUrlInfo', n)
		},
		Pay_urlFun(context, n) {
			context.commit('Pay_url', n)
		},
		IsAccountAndPasFun(context, n) {
			context.commit('IsAccountAndPas', n)
		},
		IsAccountFun(context, n) {
			context.commit('IsAccount', n)
		},
		IsAlertPwdFun(context, n) {
			context.commit('IsAlertPwd', n)
		},
		

		IsRealNameTipFun(context, n) {
			context.commit('IsRealNameTip', n)
		},
		IsRealNameFormFun(context, n) {
			context.commit('IsRealNameForm', n)
		},
		IsTiredTipFun(context, n) {
			context.commit("IsTiredTip",n)
		},
		IsRelieveTiredTipFun(context, n) {
			context.commit("IsRelieveTiredTip",n)
		},

	}

}