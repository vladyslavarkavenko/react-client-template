import api from '../utils/api';

class ShareOpinionService {
  static getSatisfactionByCompany(companyId) {
    return api.get(`/opinion/company/${companyId}/avg_satisfaction/`);
  }

  static getSatisfactionByManager(companyId) {
    return api.get(`/opinion/manager/${companyId}/avg_satisfaction/`);
  }

  static getSubjectsByManager(managerId) {
    return api.get(`/opinion/manager/${managerId}`);
  }

  static getSubjectsByCompany(companyId) {
    return api.get(`/opinion/company/${companyId}`);
  }

  static getTopicsBySubject(subjectId) {
    return api.get(`/opinion/subject/${subjectId}`);
  }

  static pushCreateSubject(data) {
    return api.post('/opinion/request/subject/', data);
  }

  static pushCreateTopic(data) {
    return api.post('/opinion/request/topic/', data);
  }

  static pushRateTopicByManager(data) {
    return api.post('/opinion/rate/manager', data);
  }

  static pushRateTopicByCompany(data) {
    return api.post('/opinion/rate/company', data);
  }

  static pushCommentToOpinion(data) {
    return api.post('/opinion/comment/', data);
  }

  static pushFileToComment({ id, data }) {
    return api.post(`/opinion/comment/${id}/upload_files/`, data);
  }

  static getTopicOpinionsByManager({ id, topic }) {
    return api.post(`/opinion/manager/${id}/grades/`, { topic });
  }

  static getTopicOpinionsByCompany({ id, topic }) {
    return api.post(`/opinion/company/${id}/grades/`, { topic });
  }

  static getAllowedSubjects() {
    return api.get('/opinion/permissions/');
  }

  static getOpinionScore(data) {
    return api.post('/formula/calculator/topic_score/', data);
  }
}

export default ShareOpinionService;
