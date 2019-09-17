import api from '../utils/api';

class CompaniesService {
  static updateCompany(data) {
    return api.patch('/company/company/', data);
  }
}

export default CompaniesService;
