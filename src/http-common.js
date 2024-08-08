import axios from 'axios'

axios.defaults.withCredentials = true

const baseURL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_API_COMMON_URL_PROD
    : import.meta.env.VITE_APP_API_COMMON_URL_LOCAL

const service = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json'
  }
})

// respone.data === "access token expired";

// 로컬스토리지 조회 인터셉터
service.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('Authorization')
    const userData = JSON.parse(user)

    if (userData && userData.accessToken) {
      config.headers['Authorization'] = `${userData.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 로컬스토리지 저장 인터셉터
service.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['authorization'] || response.headers['Authorization']
    if (authHeader) {
      const tokenData = { accessToken: authHeader.split(' ')[1] }
      localStorage.setItem('Authorization', JSON.stringify(tokenData))
    } else {
      console.warn('No Authorization header found in response')
    }
    return response
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const response = await axios.post(`${baseURL}/auth/refresh`)
        const newAccessToken = response.headers.authorization
        const tokenData = { accessToken: newAccessToken }
        localStorage.setItem('Authorization', JSON.stringify(tokenData))
        return newAccessToken
      } catch (refreshError) {
        console.log('refreshError', refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default service
