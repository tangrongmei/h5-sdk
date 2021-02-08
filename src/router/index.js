import Vue from 'vue'
import Router from 'vue-router'
// import inner from'../views/inner1'//inner1 召回 (草莓-zh)
// import inner from '../views/inner2' //inner 基础网赚  (草莓-wz、今日-jrxy、虹猫-wzhm)
import inner from '../views/inner3' //inner 基础  (海象-jc、虹猫-jchm)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inner',
      component: inner
    }
  ]
})
