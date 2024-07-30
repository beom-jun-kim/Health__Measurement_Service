import http from '../http-common'

class UserDataService {
  async createUser(data) {
    return await http.post('/user', data)
  }
  async sms(data) {
    return await http.post('/verification/sms', data)
  }
  async smsChk(data) {
    return await http.patch('/verification/sms', data)
  }
  async idChk(id) {
    return await http.get(`/user/check/${id}`)
  }
  async login(data) {
    return await http.post('/auth/login', data)
  }
  async logout() {
    return await http.post('/auth/logout')
  }

  // 본인 로그인 정보 api
  // async userLoginInfo(id) {
  //   return await http.get(`/auth/userLoginInfo/${id}`);
  // }
  
}

export default new UserDataService()
