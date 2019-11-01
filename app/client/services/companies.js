import api from '../utils/api';

class CompaniesService {
  static updateCompany(data) {
    return api.patch('/company/company/', data);
  }

  static getManager(managerId) {
    return api.get(`/company/detail/manager/${managerId}/`);
  }

  static getRadarScores(companyId) {
    return api.get(`/opinion/company/${companyId}/radar_scores/`);
  }

  static getTopScores(companyId) {
    return api.get(`/opinion/company/${companyId}/topic_scores/`);
  }

  static getStatistics(companyId) {
    return api.get(`/opinion/company/${companyId}/statistics/`);
  }

  static getComments(companyId) {
    return api.get(`/opinion/company/${companyId}/comments/`);
  }

  static getManagersList() {
    return api.get('/company/company/managers/');
  }

  static getStaffBenchmark(data) {
    return api.post('/company/company/benchmark/', data);
  }
}

export default CompaniesService;
