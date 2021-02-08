// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from "./api";
import VueResource from 'vue-resource'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.config.productionTip = false


Vue.prototype.$api=api;
Vue.prototype.$store = store;
Vue.use(VueResource)
NutUI.install(Vue);
Vue.use(ViewUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
