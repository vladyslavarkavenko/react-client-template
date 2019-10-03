import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
// import { differenceInMonths } from 'date-fns';
import getId from 'uuid/v4';

import { ROLES, STAFF_TABLE_TYPE } from '../../utils/constants';
import { makeStatusReducer } from '../../utils/reduxHelpers';
import * as actions from './staffActions';

const userScheme = {
  id: null,
  roles: [ROLES.MANAGER],
  topics: [],
  email: '',
  firstName: '',
  lastName: '',
  status: null,
  isChecked: false,
  isChanged: false
};

const invitationsInitial = Array(5)
  .fill(null)
  .map(() => {
    const user = { ...userScheme, id: getId() };
    return user;
  });

const invitationsData = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state) {
      return state;
    },
    [actions.saveTableField.TRIGGER](state, { payload }) {
      const { table, field, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATION) {
        const row = state.findIndex((item) => item.id === id);
        console.log(row, payload);

        if (row !== undefined) {
          const cloned = [...state];

          cloned[row] = { ...cloned[row], [field]: value, isChanged: true };

          return cloned;
        }
      }

      return state;
    },
    [actions.changeTableRole.TRIGGER](state, { payload }) {
      const { table, id, values } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATION) {
        const row = state.findIndex((item) => item.id === id);

        if (row !== -1) {
          const cloned = [...state];
          cloned[row].roles = values ? values.map((item) => item.value) : [];
          cloned[row] = { ...cloned[row], isChanged: true };
          return cloned;
        }
      }

      return state;
    },
    [actions.changeTableTopic.TRIGGER](state, { payload }) {
      const { table, id, values } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATION) {
        const row = state.findIndex((item) => item.id === id);

        if (row !== -1) {
          const cloned = [...state];
          cloned[row].topics = values || [];
          cloned[row] = { ...cloned[row], isChanged: true };
          return cloned;
        }
      }

      return state;
    }
  },
  invitationsInitial
);

const tablesStatus = makeStatusReducer(actions.fetchStaffTables);

const invitations = combineReducers({
  // status: '',
  data: invitationsData
});

const subjectList = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.subjects;
    }
  },
  []
);

const staff = combineReducers({
  status: tablesStatus,
  invitations,
  //   pending,
  //   active

  subjectList
});

export default staff;
