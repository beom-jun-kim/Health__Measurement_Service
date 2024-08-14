import http from '../http-common'

class Push {
  async newPush(pushListId) {
    return await http.patch('/notifications/read', pushListId)
  }
  async pushList() {
    return await http.get('/notifications/list')
  }
  async newIconPush() {
    return await http.get('/notifications/readCheck')
  }
}

export default new Push()
