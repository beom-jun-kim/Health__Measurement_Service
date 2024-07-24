import http from '../http-common';

class userDataService {
  createUser(data) {
    return http.post('/user/signup', data);
  }
  sms(data) {
    return http.post('/verification/sms', data);
  }
  smsChk(data) {
    return http.patch('/verification/sms', data);
  }
}

export default new userDataService();
