import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const refreshToken = async () => {
  // 模拟刷新 token 的请求
  return new Promise<{ newToken: string }>(resolve => {
    setTimeout(() => {
      resolve({ newToken: 'newly-refreshed-token' })
    }, 1000)
  })
}

let isRefreshing = false
let requestQueue: Array<(token: string) => void> = []

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error

    if (response?.status === 401 && !config._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          requestQueue.push((token: string) => {
            config.headers['Authorization'] = `Bearer ${token}`
            resolve(api(config))
          })
        })
      }

      config._retry = true
      isRefreshing = true

      try {
        // 刷新 token 的请求
        const { newToken } = await refreshToken()

        requestQueue.forEach(callback => callback(newToken))
        requestQueue = []

        useAuthStore.setState({ token: newToken })
        config.headers['Authorization'] = `Bearer ${newToken}`
        return api(config)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
