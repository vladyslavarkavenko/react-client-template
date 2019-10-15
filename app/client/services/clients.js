import api from '../utils/api';

class ClientsService {
  static getActiveCustomers() {
    return api.get('/company/customer/confirmed/');
  }

  static getPendingCustomers() {
    return api.get('/company/customer/unconfirmed/');
  }

  static sendInvite(data) {
    return api.post('/company/customer/invite/', data);
  }

  static updateUser({ userId, data }) {
    return api.patch(`/company/customer/${userId}/`, data);
  }
}

export default ClientsService;
