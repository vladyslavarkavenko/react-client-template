import authSelectors from '../auth/authSelectors';

const getCompanyData = (state) => state.companies.data;

const getCompaniesList = (state) => Object.values(getCompanyData(state));

const getManagersList = (state) => {
  const companies = getCompaniesList(state);
  const managers = [];

  companies.forEach((company) => {
    if (company.manager) {
      managers.push(company.manager);
    }
  });

  return managers;
};

const getCurrentManager = (state) => {
  const companies = getCompanyData(state);
  const permissions = authSelectors.rolesPermissions(state);
  const role = authSelectors.activeRole(state);

  return companies[permissions[role][0]].manager;
};

const getManagersWithCompanies = (state) => {
  const data = getCompanyData(state);

  const companyIds = Object.keys(data);

  const list = {};

  companyIds.forEach((companyId) => {
    list[companyId] = getCompanyData(state).manager;
  });

  return list;
};

const getCurrentCompany = (state) => {
  const companies = getCompanyData(state);
  const permissions = authSelectors.rolesPermissions(state);
  const role = authSelectors.activeRole(state);

  return companies[permissions[role]];
};

export default {
  getCompaniesList,
  getManagersList,
  getManagersWithCompanies,
  getCurrentManager,
  getCurrentCompany,
  data: getCompanyData,
  errors: (state) => state.companies.errors,
  activeEditCompany: (state) => state.companies.activeEditCompany,
  isEdit: (state) => state.companies.isEdit
};
