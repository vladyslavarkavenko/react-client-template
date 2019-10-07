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

export default {
  getCompaniesList,
  getManagersList,
  data: getCompanyData,
  errors: (state) => state.companies.errors,
  activeEditCompany: (state) => state.companies.activeEditCompany,
  isEdit: (state) => state.companies.isEdit
};
