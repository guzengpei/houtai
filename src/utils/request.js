import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})
// 2.1 请求拦截
request.interceptors.request.use(config => {
  // console.log(config)
  if (store.state.token && store.state.token.token) {
    config.headers.Authorization = store.state.token.token
  }

  return config
}, err => {
  console.log(err)
})
export default request
