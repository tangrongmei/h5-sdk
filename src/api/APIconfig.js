/**
 * 开发的时候默认使用开发环境，如开发时需要使用测试环境，改成test即可，注意不要上传配置文件，以免影响其他人的环境
 */
let environment = 'test' // dev是开发环境，test是测试环境
const urlConfig = {
  'dev': 'http://47.113.115.162:8181', // 开发环境地址
  'test': 'selector-test.jifenzhi.info', // 测试环境地址
  'online': 'selector.jifenzhi.info', // 线上地址
  'domain': 'jifenzhi.info', // API域名
  getEnv (url) { return window.location.href.indexOf(url) > -1 }
}
// 判断环境
if (urlConfig.getEnv(urlConfig.test)) { environment = 'test' }
if (urlConfig.getEnv(urlConfig.dev)) { environment = 'dev' }
urlConfig.getEnv(urlConfig.online) ? (environment = '') : (environment = `-${environment}`)
// 定义配置参数
export default {
  // ipApi: 'https://www.4ry.cn' 
  ipApi: 'http://apitest.hnllhy.cn' 
  // ipApi: 'http://192.168.100.45:8180' 
  
}
