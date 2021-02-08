import axios from 'axios'
import {
  formatUri
} from '../common/js/util'
import APIconfig from './APIconfig'

axios.defaults.timeout = 30000
axios.defaults.retry = 3
axios.defaults.retryDelay = 1000

// 添加请求拦截器
axios.interceptors.request.use(
  config => {

    if (config.method === 'post' || config.method === 'delete') {
      config.data = {
        ...config.data,
        // orgId: '1'
      }
    } else if (config.method === 'get') { 
   
      config.parmas= {
        
        ...config.parmas,
        // orgId: '1'
      }
        
    } else if (config.method === 'patch') {
      config.parmas= {
        ...config.data,
        // orgId: '1'
      }
    }
    config.data = JSON.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    // Message.error('权限失效，请重新登录')
  } else {
    // Message.error(`请求${error.response.status}了哟~T.T`)
  }
  return Promise.reject(error)
})

/* url请求地址，urlData发送的数据，params是post或get请求，默认为get请求 */ 
export function api (data) {
  const { url, parmas, methods, isFormat } = data
  const token = 'token'

  const formatUrl = formatUri(url, parmas)
  let newapi = APIconfig.ipApi // 这里写了一个判断，判断接口是不是mmerUrl这个接口，不是的话就走odmsUrl接口
  if (url.indexOf('/test') > -1) {
    newapi = APIconfig.ipApi
  }
  const newHeader = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json;charset=UTF-8',
    // 'uid':1
    // 'Authorization': `Bearer ${token}`
  }
  return axios(
    { method: methods,
      url: (methods === 'post' && isFormat) || methods === 'get'
        ? newapi + formatUrl
        : newapi + url, // 默认url后不拼接参数，isFormat为true再拼接参数 
      data: parmas,
      headers: newHeader
    }).then((res) => {
   
    if (res.status === 200) {
   
      return Promise.resolve(res.data)
    }
  }).catch((e) => { })
}
