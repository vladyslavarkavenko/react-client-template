export default (params) => {
  return {
    root: '/',

    notFound: '/not-found',

    login: '/login',
    registration: '/registration',
    forgotPassword: '/forgot-password',

    chooseRole: '/choose-role',

    account: '/account',
    profile: '/account/profile',
    dashboard: '/account/dashboard',
    shareOpinion: '/account/share-opinion'

    // route with params example:
    // changePassword: `/auth/reset/${params ? params : ':token'}`,
  };
};
