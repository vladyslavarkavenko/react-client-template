export default {
  status: (state) => state.auth.status,
  isAuth: (state) => state.auth.data.isAuthorized,
  activeRole: (state) => state.auth.data.activeRole,
  rolesPermissions: (state) => state.auth.data.rolesPermissions,
  errors: (state) => state.auth.errors,
  user: (state) => state.auth.data.user,
  isEdit: (state) => state.auth.isEdit,
  activeEditUser: (state) => state.auth.activeEditUser
};
