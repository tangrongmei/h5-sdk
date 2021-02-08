import Vue from 'vue'
import Vuex from 'vuex'
import winType from "./modules/winType.js"
import wzCommon from "./modules/wzCommon.js"
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    emailData:'',
    redCountData:{},//红点数量
    isFirstLoginData: {}, //是否第一次登录
    logoRedData:{},//logo红点
    userInfo: {

    },//用户信息
    wechatType: '',//是否微信内
    deviceData: {
      os: "",
      brand: '',
      systemversion: '',
      ipAdress: '127.0.0.1',
      isPC: '0'
    },//设备信息
    isBindPhone: "0",
    iframeSize: {
      m_w: '',
      m_h: ''
    },
    agreement: {
      title: '',
      details: ''
    },//用户协议内容
    emailCount:'',
    BindPhoneShow:true,//召回版 是否显示手机绑定
    logoIconShow:1,//是否显示logo浮标
    registerPwd:'',//注册的密码
    isCreateRole:false,//是否是创角
    isPay:false,
    antiAddictionData:{
      isLonginFCM:0,
      isPayFCM:0,
      isUserFCM:0
    },
    fcmLoginTime:"0",
    fcmOverTime:'0',
    otherWelfareRed:'0',
    gameCurrency:0
  },
  mutations: {
    postUserInfo(state, payload) {
      state.userInfo = payload;
    },
    postWechatType(state, payload) {
      state.wechatType = payload;
    },
    postDeviceData(state, payload) {
      state.deviceData.os = payload.os;
      state.deviceData.brand = payload.brand;
      state.deviceData.systemversion = payload.systemversion;
      state.deviceData.isPC = payload.isPC;
    },
    //是否第一次登陆
    isFirstLoginData(state, payload) {
      state.isFirstLoginData = payload;
    },
     //logo红点
     logoRedData(state, payload) {
      state.logoRedData = payload;
    },
    //红点数量   
    redCountData(state, payload) {
      state.redCountData = payload;
    },
    //点击过钱包后存储用于实时改变inner中logo红点变化
    clickWallet(state){
      state.isFirstLoginData.wallet = 1;
    },
    //点击过代金券后存储用于实时改变inner中logo红点变化
    clickVoucher(state){
      state.isFirstLoginData.voucher = 1;
    },
    //点击过微信公众号后存储用于实时改变inner中logo红点变化
    clickOfficialAccount(state){
      state.isFirstLoginData.officialAccount = 1;
    },
    //点击过福利任务后存储用于实时改变inner中logo红点变化
    clickWelfare(state){
      state.isFirstLoginData.welfare = 1;
    },
    //点击过绑定手机后存储用于实时改变inner中logo红点变化
    clickMobileBind(state){
      state.isFirstLoginData.mobileBind = 1;
    },
    //读取过消息后改变消息未读数量用于实时改变inner中logo红点变化
    redEmails(state){
      state.redCountData.emailCount -= 1;
    },
    //领取过红包后改变红包数量用于实时改变inner中logo红点变化
    redWelfare(state){
      state.redCountData.welfareTaskCount -= 1;
    },
    getIsBindPhone(state, isBindPhone) {
      state.isBindPhone = isBindPhone;
    },
    getEmailData(state, emailData) {
      state.emailData = emailData;
    },
    getIframeSize(state, payload) {
      state.iframeSize.m_w = payload.m_w;
      state.iframeSize.m_h = payload.m_h
    },
    postAgreement(state, payload) {
      state.agreement.title = payload.content
      state.agreement.details = payload.privacy
    },
    postEmailCount(state, payload) {
      state.emailCount = payload;
    },
    postBindPhoneShow(state, payload) {
      state.BindPhoneShow = payload;
    },
    postLogoIconShow(state, payload) {
      state.logoIconShow = payload;
    },
    postRegisterPwd(state, payload) {
      state.registerPwd = payload;
    },
    postIsCreateRole(state, payload) {
      state.isCreateRole = payload;
    },
    //问题---监听loginOut后强制登出操作会导致跳转支付宝后也被强制等出，
    //解决方案---跳转支付宝之前设置isPay，当监听到loginOut并且isPay为true时(为跳转支付宝操作)不进行强制登出操作
    postIsPay(state, payload){
      state.isPay = payload;
    },
    postFcmLoginTime(state, payload){
      state.fcmLoginTime = payload;
    },
    postFcmOverTime(state, payload){
      state.fcmOverTime = payload;
    },
    postOtherWelfareRed(state, payload){
      state.otherWelfareRed = payload;
    },
    postGameCurrency(state, payload){
      state.gameCurrency = payload;
    }
  },

  // getters
  getters: {


  },
  actions: {

  },
  modules: {
    // footer_store,
    winType,
    wzCommon
  }
})
export default store;
