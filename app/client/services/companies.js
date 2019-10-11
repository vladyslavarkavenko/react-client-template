import api from '../utils/api';

class CompaniesService {
  static updateCompany(data) {
    return api.patch('/company/company/', data);
  }

  static getRadarScores(companyId) {
    return api.get(`/opinion/company/${companyId}/radar_scores/`);
  }

  static getTopScores(companyId) {
    return api.get(`/opinion/company/${companyId}/topic_scores/`);
  }
}

export default CompaniesService;
