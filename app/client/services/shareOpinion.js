import api from '../utils/api';

class ShareOpinionService {
  static getSubjectsByManager(managerId) {
    return api.get(`/opinion/manager/${managerId}`);
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
}

export default ShareOpinionService;
