import http from '../http-common'

class Follow {
  async getFollowId(data) {
    return await http.get('/invite/search', data)
  }
}

export default new Follow()
