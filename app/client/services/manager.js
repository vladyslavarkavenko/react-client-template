import api from '../utils/api';

class ManagerService {
  static getTop5Topics(criteriaId, managerId) {
    return api.get(`/history/manager/${managerId}/criteria_benchmark/?criteria=${criteriaId}`);
  }

  static getProfile(managerId) {
    return api.get(`/company/detail/manager/${managerId}/`);
  }

  static getRadarScores(managerId) {
    return api.get(`/opinion/manager/${managerId}/radar_scores/`);
  }

  static getCriteria(managerId) {
    return api.get(`/opinion/manager/${managerId}/criteria/`);
  }

  static getSatisfiedClients(managerId) {
    return api.get(`/opinion/manager/${managerId}/avg_satisfaction/`);
  }

  static getTopScores(managerId) {
    return api.get(`/opinion/manager/${managerId}/topic_scores/`);
  }

  static getStatistics(managerId) {
    return api.get(`/opinion/manager/${managerId}/statistics/`);
  }

  static getComments(managerId) {
    return api.get(`/opinion/manager/${managerId}/comments/`);
  }
}

export default ManagerService;
