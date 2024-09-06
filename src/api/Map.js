import http from '../http-common'

class Map {
  async searchAddr(data) {
    return await http.get(`/container/gw?address=${data}`)
  }
  async containerInfo() {
    return await http.get(`/container/info`)
  }
  async getCityes() {
    return await http.get(`/code?type=city`)
  }
  async getContainer(code) {
    return await http.get(`/container/info?code=${code}`)
  }
}

export default new Map()
