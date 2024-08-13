import http from '../http-common'

class Push {
  async newPush() {
    return await http.get('/notifications/read')
  }
  async pushList() {
    return await http.get('/notifications/list')
  }
}

export default new Push()
