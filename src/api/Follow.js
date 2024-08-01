import http from '../http-common'

class Follow {
  async getFollowId(id) {
    return await http.get(`/invite/search?userId=${id}`)
  }
  async getFollowPhone(id) {
    return await http.get(`/invite/search?phoneNumber=${id}`)
  }
  async followReq(data) {
    return await http.post('/invite', data)
  }
  async followReqDel(data) {
    return await http.delete('/invite', data)
  }
  async followReqAccept(data) {
    return await http.patch('/invite', data)
  }
  async getFollowReceptionList() {
    return await http.get('/invite')
  }
  async getFollowGList() {
    return await http.get('/invite/user')
  }
  async getFollowReqDetail(id) {
    return await http.get(`/invite/user-detail?userSid=${id}`)
  }
}

export default new Follow()
