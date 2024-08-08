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

const getNewAccessToken = async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true })
    const newAccessToken = response.data.accessToken
    const tokenData = { accessToken: `Bearer ${newAccessToken}` } // Bearer 포함
    localStorage.setItem('Authorization', JSON.stringify(tokenData))
    return tokenData.accessToken
  } catch (error) {
    console.error('Failed to refresh access token', error)
    throw error
  }
}

// 로컬스토리지 조회 인터셉터
service.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('Authorization')
    if (user) {
      const userData = JSON.parse(user)
      if (userData && userData.accessToken) {
        config.headers['Authorization'] = userData.accessToken
      }
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
      const tokenData = { accessToken: `Bearer ${authHeader.split(' ')[1]}` }
      localStorage.setItem('Authorization', JSON.stringify(tokenData))
    } else {
      console.warn('No Authorization header found in response')
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 || error.response.status === 403) {
      originalRequest._retry = true
      try {
        const newAccessToken = await getNewAccessToken()
        axios.defaults.headers.common['Authorization'] = newAccessToken
        originalRequest.headers['Authorization'] = newAccessToken
        return service(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default service
