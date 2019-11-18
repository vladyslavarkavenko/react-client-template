import api from '../utils/api';

class KpiService {
  static getKpiSettings() {
    return api.get('/kpi/kpi/');
  }

  static setKpiParam(data) {
    return api.patch('/kpi/kpi/', data);
  }
}

export default KpiService;
