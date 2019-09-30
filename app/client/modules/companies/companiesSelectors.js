import authSelectors from '../auth/authSelectors';

const getCompanyData = (state) => state.companies.data;

const getCompaniesList = (state) => Object.values(getCompanyData(state));

const getManagersList = (state) => getCompaniesList(state).map((company) => company.manager);

const getCurrentManager = (state) => {
  const companies = getCompanyData(state);
  const permissions = authSelectors.rolesPermissions(state);
  const role = authSelectors.activeRole(state);

  return companies[permissions[role]].manager;
};

const getManagersWithCompanies = (state) => {
  const data = getCompanyData(state);

  const companyIds = Object.keys(data);

  const list = {};

  companyIds.forEach((companyId) => {
    list[companyId] = getCompanyData(state).manager;
  });

  console.log(list);

  return list;
};

export default {
  getCompaniesList,
  getManagersList,
  getManagersWithCompanies,
  getCurrentManager,
  data: getCompanyData,
  errors: (state) => state.companies.errors,
  activeEditCompany: (state) => state.companies.activeEditCompany,
  isEdit: (state) => state.companies.isEdit
};
