import { handleActions } from 'redux-actions';
import reducerRegistry from '../../utils/reducerRegistry';

import * as actions from './companiesActions';
import * as auth from '../auth/authActions';
import { formatRolesPayload } from '../helpers/helpers';

const companiesInitial = null; // { id1: {}, id2: {}, ... }

// TODO: Need refactoring
const companiesReducer = handleActions(
  {
    [auth.pushLogin.SUCCESS](state, { payload }) {
      const { companies } = formatRolesPayload(payload.roles);
      return companies;
    },
    [auth.pushLoginByToken.SUCCESS](state, { payload }) {
      const { companies } = formatRolesPayload(payload.roles);
      return companies;
    },
    [actions.setCompanies.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.pushUpdateCompany.SUCCESS](state, { payload }) {
      const newCompanies = { ...state.companies };
      newCompanies[payload.id] = payload;

      return newCompanies;
    }
  },
  companiesInitial
);

// reducerRegistry.register(actions.prefix, companiesReducer);
export default companiesReducer;
