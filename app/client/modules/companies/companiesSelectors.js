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

const getCurrentCompany = (state) => {
  const companies = getCompanyData(state);
  const permissions = authSelectors.rolesPermissions(state);
  const role = authSelectors.activeRole(state);

  return companies[permissions[role]];
};

export default {
  getCompaniesList,
  getManagersList,
  getCurrentCompany,
  data: getCompanyData,
  errors: (state) => state.companies.errors,
  activeEditCompany: (state) => state.companies.activeEditCompany,
  isEdit: (state) => state.companies.isEdit
};
