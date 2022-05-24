import axios from 'axios';

const API_URL = 'http://localhost:8080/users/';

class AuthService {
  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL, {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
