import axios from "axios"
import { Toast } from "vant"

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
})

instance.interceptors.request.use((config) => {
  const Token = localStorage.getItem("token") || ""
  config.headers = Object.assign({ authorization: Token }, config.headers)
  return config
})

instance.interceptors.response.use(
  (response) => {
    if (response.data.status === 200) {
      return response.data.result
    }
    Toast(response.data.message || "请求失败，请稍后重试")
    return Promise.reject(response.data)
  },
  async (err) => {
    Toast("服务器连接失败")
    return Promise.reject(err)
  }
)

export default instance
