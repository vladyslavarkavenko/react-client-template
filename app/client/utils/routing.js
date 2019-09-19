export default (/* params */) => ({
  root: '/',

  notFound: '/not-found',

  login: '/login',
  registration: '/registration',
  forgotPassword: '/forgot-password',

  chooseRole: '/choose-role',

  account: '/account',

  profile: '/account/profile/:type',

  about: '/account/profile/about',
  overview: '/account/profile/overview',

  dashboard: '/account/dashboard',
  shareOpinion: '/account/share-opinion'

  // route with params example:
  // changePassword: `/auth/reset/${params ? params : ':token'}`,
});
