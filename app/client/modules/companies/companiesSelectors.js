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

const getCurrentManager = (state, managerId) => {
  const companies = getCompanyData(state); //state.companies.data
  const currentUserId = authSelectors.getCurrentUserId(state); // permission[activeRole];

  if (Array.isArray(currentUserId)) {
    // if user is customer with multiple companies
    const companyWithManager = Object.values(companies).find(
      (company) => company.manager.id === Number(managerId)
    );
    return companyWithManager ? companyWithManager.manager : null;
  }

  return companies[currentUserId].manager;
};

const getCurrentCompany = (state, id) => {
  const companies = getCompanyData(state); //state.companies.data
  const currentUserId = authSelectors.getCurrentUserId(state); // permission[activeRole];

  if (Array.isArray(currentUserId)) {
    // if user is customer with multiple companies
    const key = currentUserId.find((item) => item === id);

    return key ? companies[key] : null;
  }

  return companies[currentUserId];
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
  getCurrentManager,
  getCurrentCompany,
  data: getCompanyData,
  errors: (state) => state.companies.errors,
  activeEditCompany: (state) => state.companies.activeEditCompany,
  isEdit: (state) => state.companies.isEdit
};
