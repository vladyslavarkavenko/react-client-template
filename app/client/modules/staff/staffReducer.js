import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { differenceInMonths } from 'date-fns';
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

const minRowCount = 5;

const normalizeUserData = (user, isActive) => {
  const roles = [];
  let status = null;

  if (user.isAdmin) {
    roles.push(ROLES.ADMIN);
  }

  if (user.isManager) {
    roles.push(ROLES.MANAGER);
  }

  if (user.isAnalyst) {
    roles.push(ROLES.ANALYST);
  }

  if (user.expiredIn) {
    differenceInMonths(new Date(), user.expiredIn) > 6
      ? (status = 'Expired')
      : (status = 'Pending');
  }

  if (isActive) {
    status = 'Active';
  }

  if (!roles.length) {
    status = 'Blocked';
  }

  return {
    ...user.userData,
    id: user.id,
    expiredIn: user.expiredIn,
    topics: [],
    isChecked: false,
    isChanged: false,
    status,
    roles
  };
};

const invitationsInitial = Array(minRowCount)
  .fill(null)
  .map(() => ({ ...userScheme, id: getId() }));

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
      const { table, id, values, action } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATION) {
        const row = state.findIndex((item) => item.id === id);

        if (row !== -1) {
          const cloned = [...state];

          if (action === 'select-group') {
            const selectedId = cloned[row].topics.map((topic) => topic.value);
            const uniqueOptions = values.filter(
              (option) => selectedId.indexOf(option.value) === -1
            );

            cloned[row].topics = [...cloned[row].topics, ...uniqueOptions];
          } else {
            cloned[row].topics = values || [];
          }

          cloned[row] = { ...cloned[row], isChanged: true };
          return cloned;
        }
      }

      return state;
    },
    [actions.pushSendInvitations.SUCCESS](state, { payload }) {
      const createdUsersId = payload.map((item) => item.tempId);
      const clearedState = state.filter((user) => !createdUsersId.includes(user.id));
      let emptyRows = [];

      if (clearedState.length < minRowCount) {
        const emptyRowsCount = minRowCount - clearedState.length;

        emptyRows = Array(emptyRowsCount)
          .fill(null)
          .map(() => ({ ...userScheme, id: getId() }));
      }

      console.log(emptyRows);

      return [...clearedState, ...emptyRows];
    }
  },
  invitationsInitial
);

const invitationsErrors = handleActions(
  {
    [actions.pushSendInvitations.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.pushSendInvitations.SUCCESS]() {
      return {};
    },
    [actions.pushSendInvitations.TRIGGER]() {
      return {};
    }
  },
  {}
);

const invitationsStatus = makeStatusReducer(actions.pushSendInvitations);

const invitations = combineReducers({
  status: invitationsStatus,
  data: invitationsData,
  errors: invitationsErrors
});

const pendingData = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.pending.map((user) => normalizeUserData(user));
    },
    [actions.pushSendInvitations.SUCCESS](state, { payload }) {
      const createdUsers = payload.map((item) => ({ ...item.user, topics: item.topics }));

      return [...createdUsers, ...state];
    }
  },
  []
);

const pendingStatus = makeStatusReducer(actions.fetchPendingTable);

const pending = combineReducers({
  status: pendingStatus,
  data: pendingData
});

const subjectList = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.subjects;
    }
  },
  []
);

const tablesStatus = makeStatusReducer(actions.fetchStaffTables);

const staff = combineReducers({
  status: tablesStatus,
  invitations,
  pending,
  //   active

  subjectList
});

export default staff;
