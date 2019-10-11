import authSelectors from '../auth/authSelectors';

const getCompanyData = (state) => state.companies.data;

const getCompaniesList = (state) => Object.values(getCompanyData(state));

const getCompaniesForActiveRole = (state) => {
  const companies = getCompaniesList(state);
  const myCompaniesIds = authSelectors.getCurrentUserId(state);

  if (Array.isArray(myCompaniesIds)) {
    return companies.filter(({ id }) => myCompaniesIds.indexOf(id) !== -1);
  }

  return companies.find(({ id }) => myCompaniesIds === id);
};

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

const getCurrentManager = (state, managerId) => {
  const companies = getCompanyData(state); //state.companies.data
  const currentUserId = authSelectors.getCurrentUserId(state); // permission[activeRole];

  if (Array.isArray(currentUserId)) {
    // if user is customer with multiple companies
    const companyWithManager = Object.values(companies).find(
      // safe check manager
      (company) => company.manager && company.manager.id === Number(managerId)
    );

    return companyWithManager ? companyWithManager.manager : null;
  }

  return companies[currentUserId].manager || null;
};

const getCurrentCompany = (state, companyId) => {
  const companies = getCompanyData(state); //state.companies.data
  let currentUserId = authSelectors.getCurrentUserId(state); // permission[activeRole];
  currentUserId = Array.isArray(currentUserId) ? currentUserId[0] : currentUserId;

  return companies[companyId || currentUserId || null];
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

export default {
  getCompaniesList,
  getManagersList,
  getManagersWithCompanies,
  getCompaniesForActiveRole,
  getCurrentManager,
  getCurrentCompany,
  data: getCompanyData,
  errors: (state) => state.companies.errors,
  activeEditCompany: (state) => state.companies.activeEditCompany,
  isEdit: (state) => state.companies.isEdit
};
