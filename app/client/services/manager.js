import api from '../utils/api';

class ManagerService {
  static getRadarScores(id) {
    return api.get(`/opinion/manager/${id}/radar_scores/`);
  }

  static getSatisfiedClients(id) {
    return api.get(`/opinion/manager/${id}/avg_satisfaction/`);
  }
}

export default ManagerService;
