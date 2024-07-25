import http from '../http-common'

class userDataService {
  createUser(data) {
    return http.post('/user', data)
  }
  sms(data) {
    return http.post('/verification/sms', data)
  }
  smsChk(data) {
    return http.patch('/verification/sms', data)
  }
  idChk(id) {
    return http.get(`/user/check/${id}`)
  }
  login(data) {
    return http.post(`/auth/login`, data)
  }
}

export default new userDataService()
