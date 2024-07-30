import http from '../http-common'

class Map {
  async searchAddr(data) {
    return await http.get(`/container/gw?address=${data}`)
  }
}

export default new Map()
