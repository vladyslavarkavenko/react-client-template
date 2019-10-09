import { setApiHeaders } from '../../utils/api';
import { ROLES } from '../../utils/constants';

const { CUSTOMER, ADMIN, ANALYST, MANAGER } = ROLES;

export const setTokens = ({ access, refresh }) => {
  if (access) {
    localStorage.setItem('access_token', access);
    setApiHeaders({ Authorization: `Bearer ${access}` });
  }
  if (refresh) {
    localStorage.setItem('refresh_token', refresh);
  }
};

export const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('role');
  setApiHeaders({ Authorization: '' });
};

export const formatRolesPayload = ({ customers, staff }) => {
  let activeRole = null;
  const newState = {};
  const companies = {};
  const rolesPermissions = {};

  if (staff) {
    const { company, isAdmin, isAnalyst, isManager, id: staffId } = staff;
    const { id } = company;

    companies[id] = company;
    if (isManager) {
      rolesPermissions[MANAGER] = id;
    }
    if (isAnalyst) {
      rolesPermissions[ANALYST] = id;
    }
    if (isAdmin) {
      rolesPermissions[ADMIN] = id;
    }

    newState.staffId = staffId;
  }

  if (customers.length) {
    rolesPermissions[CUSTOMER] = [];
    customers.forEach(({ company, manager, id }) => {
      const newManager = { ...manager, customerId: id };

      companies[company.id] = { ...company, manager: newManager, customerId: id };
      rolesPermissions[CUSTOMER].push(company.id);
    });
  }

  const availableRoles = Object.keys(rolesPermissions);
  if (availableRoles.length === 1) {
    // eslint-disable-next-line prefer-destructuring
    activeRole = availableRoles[0];
  }

  newState.companies = companies;
  newState.rolesPermissions = rolesPermissions;
  if (activeRole) {
    newState.activeRole = activeRole;
  }

  return newState;
};
