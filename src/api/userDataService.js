import http from '../http-common'

class UserDataService {
  createUser(data) {
    return http.post('/signup', data);
  }
}

export default new UserDataService();
