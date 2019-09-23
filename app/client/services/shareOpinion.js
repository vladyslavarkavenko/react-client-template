import api from '../utils/api';

class ShareOpinionService {
  static getSubjectsByManager(managerId) {
    return api.get(`/opinion/manager/${managerId}`);
  }

  static getTopicsBySubject(subjectId) {
    return api.get(`/opinion/subject/${subjectId}`);
  }
}

export default ShareOpinionService;
