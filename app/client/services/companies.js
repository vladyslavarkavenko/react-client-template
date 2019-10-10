import api from '../utils/api';

class CompaniesService {
  static updateCompany(data) {
    return api.patch('/company/company/', data);
  }

  static getRadarScores(companyId) {
    return api.get(`/opinion/company/${companyId}/radar_scores/`);
  }

  static getSatisfiedClients(companyId) {
    return api.get(`/opinion/company/${companyId}/avg_satisfaction/`);
  }

  static getTopScores(companyId) {
    return api.get(`/opinion/company/${companyId}/topic_scores/`);
  }
}

export default CompaniesService;
