import api from '../utils/api';

class CompaniesService {
  static getTop5Topics(criteriaId, companyId) {
    return api.get(`/history/company/${companyId}/criteria_benchmark/?criteria=${criteriaId}`);
  }

  static getTop(key) {
    return api.get(`/company/company/top/?key=${key}`);
  }

  static getProfile(companyId) {
    return api.get(`/company/detail/company/${companyId}/`);
  }

  static getFeedback() {
    return api.get('/company/company/feedbacks/');
  }

  static updateCompany(data) {
    return api.patch('/company/company/', data);
  }

  static getManager(managerId) {
    return api.get(`/company/detail/manager/${managerId}/`);
  }

  static getCriteria(companyId) {
    return api.get(`/opinion/company/${companyId}/criteria/`);
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

  static getComments({ managerId, page = 1, offset = 10 }) {
    return api.get(
      `/opinion/manager/${managerId}/comments/?page=${page}&offset=${offset}&limit=${offset}`
    );
  }

  static getManagersList() {
    return api.get('/company/company/managers/');
  }

  static getStaffBenchmark(data) {
    return api.post('/company/company/benchmark/', data);
  }
}

export default CompaniesService;
