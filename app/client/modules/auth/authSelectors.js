const rolesPermissions = (state) => state.auth.data.rolesPermissions;
const activeRole = (state) => state.auth.data.activeRole;
const getUser = (state) => state.auth.data.user;

const getCurrentUserId = (state) => {
  const permissions = rolesPermissions(state);
  const role = activeRole(state);

  return permissions[role];
};

export default {
  activeRole,
  rolesPermissions,
  getCurrentUserId,
  user: getUser,
  status: (state) => state.auth.status,
  isAuth: (state) => state.auth.data.isAuthorized,
  errors: (state) => state.auth.errors,
  isEdit: (state) => state.auth.isEdit,
  activeEditUser: (state) => state.auth.activeEditUser
};
