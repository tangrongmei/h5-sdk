export default {
    state: {
        isWallet: false,//钱包窗口
        isExchange:false,//兑换窗口
        isRecharge:false,//充值窗口
        wzAmount:0,//兑换之后返回的余额
        isInfo:false,//是否填写过兑换用户资料
        isApplyPrize:false//是否兑换过奖品
    },
    mutations: {
        IsWallet(state, isWallet) {
            state.isWallet = isWallet
        },
        IsExchange(state, isExchange) {
            state.isExchange = isExchange
        },
        IsRecharge(state, isRecharge) {
            state.isRecharge = isRecharge
        },
        WzAmount(state, wzAmount) {
            state.wzAmount = wzAmount
        },
        IsInfo(state, isInfo) {
            state.isInfo = isInfo
        },
        IsApplyPrize(state, isApplyPrize) {
            state.isApplyPrize = isApplyPrize
        },
        
        
    },

    actions: {
        IsWalletFun(context, n) {
            context.commit('IsWallet', n)
        },
        IsExchangeFun(context, n) {
            context.commit('IsExchange', n)
        },
        IsRechargeFun(context, n) {
            context.commit('IsRecharge', n)
        },
        WzAmountFun(context, n) {
            context.commit('WzAmount', n)
        },
        IsInfoFun(context, n) {
            context.commit('IsInfo', n)
        },
        IsApplyPrizeFun(context, n) {
            context.commit('IsApplyPrize', n)
        },
    }
}
