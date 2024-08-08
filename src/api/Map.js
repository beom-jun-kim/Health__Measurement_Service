import http from '../http-common'

class Map {
  async searchAddr(data) {
    return await http.get(`/container/gw?address=${data}`)
  }
  async containerInfo() {
    return await http.get(`/container/info`)
  }
}

export default new Map()