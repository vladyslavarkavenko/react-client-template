export default {
  status: (state) => state.auth.status,
  userData: (state) => state.auth.data.user,
  isAuth: (state) => state.auth.data.isAuthorized,
  activeRole: (state) => state.auth.data.activeRole,
  rolesPermissions: (state) => state.auth.data.rolesPermissions
};
