import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/users/';

class UserService {
  getAll() {
    return axios.get(API_URL );
  }
  validation(email) {
    return axios.post(API_URL + 'valide',{
      "email":email
    });
  }
  genereToken(email) {
    return axios.post(API_URL + 'genereToken',{
      "email":email
    });
  }
}

export default new UserService();
