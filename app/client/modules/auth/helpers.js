import { setApiHeaders } from '../../utils/api';
import { ROLES } from '../../constants';

const {
  CUSTOMER, ADMIN, ANALYST, MANAGER,
} = ROLES;

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
  setApiHeaders({ Authorization: '' });
};

export const stateFromRes = ({ customers, staff }) => {
  const {
    company,
    isAdmin,
    isAnalyst,
    isManager,
  } = staff;

  let activeRole = null;
  const companies = {};
  const rolesPermissions = {};

  if (company) {
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
  }

  if (customers.length) {
    rolesPermissions[CUSTOMER] = [];
    customers.forEach(({ company, manager }) => {
      const { id } = company;

      companies[id] = { ...company, manager };
      rolesPermissions[CUSTOMER].push(id);
    });
  }

  const availableRoles = Object.keys(rolesPermissions);
  if (availableRoles.length === 1) {
    // eslint-disable-next-line prefer-destructuring
    activeRole = availableRoles[0];
  }

  const newState = { companies, rolesPermissions };
  if (activeRole) {
    newState.activeRole = activeRole;
  }

  return newState;
};
