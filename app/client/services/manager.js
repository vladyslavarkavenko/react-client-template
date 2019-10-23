import api from '../utils/api';

class ManagerService {
  static getRadarScores(managerId) {
    return api.get(`/opinion/manager/${managerId}/radar_scores/`);
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
