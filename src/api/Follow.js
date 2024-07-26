import http from '../http-common'

class Follow {
  async getFollowId() {
    return await http.get('/invite/search')
  }
}

export default new Follow()
