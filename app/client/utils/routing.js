export default (/* params */) => ({
  root: '/',

  notFound: '/not-found',

  login: '/login',
  registration: '/registration',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset_password/',

  chooseRole: '/choose-role',

  account: '/account',

  profile: '/account/profile/:type',

  about: '/account/profile/about',
  overview: '/account/profile/overview',

  dashboard: '/account/dashboard',

  shareOpinion: '/account/share-opinion',
  shareOpinionChart: '/account/share-opinion/rate',
  shareOpinionMessage: '/account/share-opinion/message',

  staff: '/manage/staff'

  // route with params example:
  // changePassword: `/auth/reset/${params ? params : ':token'}`,
});
