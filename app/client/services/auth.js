import api from '../utils/api';

class AuthService {
  static register(data) {
    return api.post('/core/registration/', data);
  }

  static obtainTokens(data) {
    return api.post('/core/token/obtain/', data);
  }

  static getUser() {
    return api.get('/core/user/');
  }

  static getRoles() {
    return api.get('/core/user/roles/');
  }

  static refresh(data) {
    return api.post('/core/token/refresh/', data);
  }
}

export default AuthService;
