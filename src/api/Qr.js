import http from '../http-common'

class Qr {
  async qrCreate() {
    return await http.post('/qrcode')
  }
}

export default new Qr()
