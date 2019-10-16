import { RATE_PROFILE_TYPE, ROUTING_PARAMS } from './constants';

function generateProfileLink({ id, type }) {
  switch (type) {
    case RATE_PROFILE_TYPE.MANAGER:
      return `${ROUTING_PARAMS.MANAGER}_${id}`;
    case RATE_PROFILE_TYPE.COMPANY:
      return `${ROUTING_PARAMS.COMPANY}_${id}`;
    default:
      return '';
  }
}

function generateOpinionLink({ id, type, criteriaId, subjectId, topicId }) {
  let params = '';

  if (criteriaId && subjectId && topicId) {
    const paramObj = new URLSearchParams();
    paramObj.append(ROUTING_PARAMS.CRITERIA_ID, criteriaId);
    paramObj.append(ROUTING_PARAMS.SUBJECT_ID, subjectId);
    paramObj.append(ROUTING_PARAMS.TOPIC_ID, topicId);
    params = `?${paramObj.toString()}`;
  }

  switch (type) {
    case RATE_PROFILE_TYPE.MANAGER:
      return `${ROUTING_PARAMS.MANAGER}_${id}${params}`;
    case RATE_PROFILE_TYPE.COMPANY:
      return `${ROUTING_PARAMS.COMPANY}_${id}${params}`;
    default:
      return '';
  }
}

export default (params) => ({
  root: '/',

  notFound: '/not-found',

  login: '/login',
  registration: '/registration',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset_password/',

  chooseRole: '/choose-role',

  account: '/account',

  profile: '/account/profile/:tab',
  about: '/account/profile/about',
  overview: '/account/profile/overview',

  managerProfile: `/manager/profile/${params || ':id'}/:tab`,
  managerProfileAbout: `/manager/profile/${params || ':id'}/about`,
  managerProfileOverview: `/manager/profile/${params || ':id'}/overview`,

  companyProfile: `/company/profile/${params || ':id'}/:tab`,
  companyProfileAbout: `/company/profile/${params || ':id'}/about`,
  companyProfileOverview: `/company/profile/${params || ':id'}/overview`,

  dashboard: '/account/dashboard',

  shareOpinion: '/account/share-opinion',
  shareOpinionWithProfile: `/account/share-opinion/${
    params ? generateProfileLink(params) : ':type\\_:id'
  }`,
  shareOpinionChart: '/account/share-opinion/rate',
  shareOpinionMessage: '/account/share-opinion/message',

  opinionDetails: `/opinions/${params ? generateOpinionLink(params) : ':type\\_:id'}`,

  staff: '/manage/staff',
  clients: '/manage/clients',

  company: '/account/company',
  messages: '/account/messages',
  manager: '/account/manager',
  opinions: '/account/opinions'

  // route with params example:
  // changePassword: `/auth/reset/${params ? params : ':token'}`,
});
