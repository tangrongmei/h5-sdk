import {
  api
} from './api'

export default {


  getEnterpriseInformation(parmas) {
    return api({
      url: '/gw/index/getEnterpriseInformation',
      parmas,
      methods: 'get'
    })
  },

  // ------------------------------------登录注册 --------------------------------------------
  // 用户协议
  agreement(parmas) {
    return api({
      url: '/api/member/agreement',
      parmas,
      methods: 'get'
    })
  },
  // 用户注册
  reg(parmas) {
    return api({
      url: '/api/member/reg',
      parmas,
      methods: 'post'
    })
  },
  // 获取验证码 
  code(parmas) {
    return api({
      url: '/api/member/code',
      parmas,
      methods: 'post'
    })
  },
  // 用户登录
  login(parmas) {
    return api({
      url: '/api/member/login',
      parmas,
      methods: 'post'
    })
  },
  // 重置密码
  reset(parmas) {
    return api({
      url: '/api/member/reset',
      parmas,
      methods: 'post'
    })
  },
  //修改密码
  recompose(parmas) {
    return api({
      url: "/api/member/password",
      parmas,
      methods: 'post'
    })
  },
  // 游客登录 
  tourist(parmas) {
    return api({
      url: '/api/member/tourist',
      parmas,
      methods: 'post'
    })
  },
  // 绑定手机
  bind_phone_code(parmas) {
    return api({
      url: '/api/member/bind_phone_code',
      parmas,
      methods: 'post'
    })
  },
  // 实名认证
  setFcm(parmas) {
    return api({
      url: '/api/member/setFcm',
      parmas,
      methods: 'post'
    })
  },
}
