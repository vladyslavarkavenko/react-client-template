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

  static pushRateTopic(data) {
    return api.post('/opinion/opinion/', data);
  }

  static pushUpdateTopic(data) {
    return api.patch('/opinion/opinion/', data);
  }

  static pushFileToTopic({ id, data }) {
    return api.post(`/opinion/opinion/${id}/upload_files/`, data);
  }
}

export default ShareOpinionService;
