import reducerRegistry from '../utils/reducerRegistry';
import CompaniesService from '../services/companies';

const reducerName = 'companies';

const createActionName = (name) => `app/${reducerName}/${name}`;

const SET_COMPANY = createActionName('SET_COMPANY');
const SET_COMPANIES = createActionName('SET_COMPANIES');

const initialState = {
  companies: null // { id1: {}, id2: {}, ... }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANIES: {
      const { companies } = action;

      return {
        ...state,
        companies
      };
    }
    case SET_COMPANY: {
      // TODO: Fix broke immutability.
      const { company } = action;
      const newCompanies = { ...state.companies };
      newCompanies[company.id] = company;

      return {
        ...state,
        companies: newCompanies
      };
    }
    default:
      return state;
  }
}

const setCompany = (company) => ({
  company,
  type: SET_COMPANY
});

export const setCompanies = (companies) => ({
  companies,
  type: SET_COMPANIES
});

// TODO: Check this.
export function updateCompany(data, cb) {
  return (dispatch) =>
    CompaniesService.updateCompany(data)
      .then((company) => {
        dispatch(setCompany(company));
        cb();
      })
      .catch((err) => console.log('err', err));
}

reducerRegistry.register(reducerName, reducer);
