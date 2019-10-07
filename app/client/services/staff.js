import api from '../utils/api';

class StaffService {
  static getActiveStaff() {
    return api.get('/company/staff/confirmed/');
  }

  static getPendingStaff() {
    return api.get('/company/staff/unconfirmed/');
  }

  static sendInvite(data) {
    return api.post('/company/staff/invite/', data);
  }

  static resendInvite(data) {
    return api.post('/company/company/ping/', data);
  }

  static setTopicsPermission(data) {
    return api.post('/opinion/permissions/set/', data);
  }
}

export default StaffService;
