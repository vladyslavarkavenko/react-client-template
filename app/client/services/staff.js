import api from '../utils/api';

class StaffService {
  static getActiveStaff() {
    return api.get('/company/staff/confirmed/');
  }

  static getStaffStatistics(id) {
    return api.get(`/opinion/manager/${id}/statistics/`);
  }

  static getPendingStaff() {
    return api.get('/company/staff/unconfirmed/');
  }

  static sendInvite(data) {
    return api.post('/company/staff/invite/', data);
  }

  static blockUser(userId) {
    return api.get(`/company/staff/${userId}/deactivate/`);
  }

  static updateUser({ userId, data }) {
    return api.patch(`/company/staff/${userId}/`, data);
  }

  static resendInvite(data) {
    return api.post('/company/company/ping/', data);
  }

  static setTopicsPermission(data) {
    return api.post('/opinion/permissions/set/', data);
  }
}

export default StaffService;
