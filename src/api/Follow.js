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
  async followReqDelPro(id) {
    return await http.delete(`/invite?userSid=${id}`)
  }
  async followReqDelGuar(id) {
    return await http.delete(`/invite?guardianSid=${id}`)
  }
  async followCancelReq(id) {
    return await http.delete(`/invite?userSid=${id}`)
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
  async getFollowPList() {
    return await http.get('/invite/guardian')
  }
  async getFollowReqDetail(id) {
    return await http.get(`/invite/user-detail?userSid=${id}`)
  }
}

export default new Follow()
