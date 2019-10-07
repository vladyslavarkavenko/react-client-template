import getId from 'uuid/v4';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { ROLES, STAFF_TABLE_TYPE, STAFF_TABLE_STATUS } from '../../utils/constants';
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

const invitationsInitial = Array(minRowCount)
  .fill(null)
  .map(() => ({ ...userScheme, id: getId() }));

const invitationsData = handleActions(
  {
    [actions.saveTableField.TRIGGER](state, { payload }) {
      const { table, field, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
        const row = state.findIndex((item) => item.id === id);

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

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
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

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
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

      return [...clearedState, ...emptyRows];
    },
    [actions.selectAllRows.TRIGGER](state, { payload }) {
      const { table, checked } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
        if (checked) {
          return state.map((row) => ({ ...row, isChecked: true }));
        }

        return state.map((row) => ({ ...row, isChecked: false }));
      }

      return state;
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
      return payload.pending;
    },
    [actions.pushSendInvitations.SUCCESS](state, { payload }) {
      return [...payload, ...state];
    },
    [actions.pushResendInvitations.SUCCESS](state, { payload }) {
      const unchanged = [];
      const updated = [];
      const listId = payload.map((row) => row.id);
      state.forEach((row) => {
        if (listId.indexOf(row.id) !== -1) {
          updated.push({
            ...row,
            status: STAFF_TABLE_STATUS.PENDING,
            isChecked: false,
            isChanged: false
          });
        } else {
          unchanged.push(row);
        }
      });

      return [...updated, ...unchanged];
    },
    [actions.saveTableField.TRIGGER](state, { payload }) {
      const { table, field, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.PENDING) {
        const row = state.findIndex((item) => item.id === id);

        if (row !== undefined) {
          const cloned = [...state];

          cloned[row] = { ...cloned[row], [field]: value, isChanged: true };

          return cloned;
        }
      }

      return state;
    },
    [actions.selectAllRows.TRIGGER](state, { payload }) {
      const { table, checked } = payload;

      if (table === STAFF_TABLE_TYPE.PENDING) {
        if (checked) {
          return state.map((row) => ({ ...row, isChecked: true }));
        }

        return state.map((row) => ({ ...row, isChecked: false }));
      }

      return state;
    }
  },
  []
);

const pendingStatus = makeStatusReducer(actions.pushResendInvitations);

const pending = combineReducers({
  status: pendingStatus,
  data: pendingData
});

const activeData = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.active;
    },
    [actions.saveTableField.TRIGGER](state, { payload }) {
      const { table, field, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
        const row = state.findIndex((item) => item.id === id);

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

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
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

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
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
    [actions.selectAllRows.TRIGGER](state, { payload }) {
      const { table, checked } = payload;

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
        if (checked) {
          return state.map((row) => ({ ...row, isChecked: true }));
        }

        return state.map((row) => ({ ...row, isChecked: false }));
      }

      return state;
    }
  },
  []
);

const activeErrors = handleActions(
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

// const activeStatus = makeStatusReducer(actions.pushSendInvitations);

const active = combineReducers({
  // status: activeStatus,
  data: activeData,
  errors: activeErrors
});

const subjectList = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.subjects;
    }
  },
  []
);

const subjectListNormalized = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.subjectsFlatten;
    }
  },
  []
);

const tablesStatus = makeStatusReducer(actions.fetchStaffTables);

const staff = combineReducers({
  status: tablesStatus,
  invitations,
  pending,
  active,

  subjectList,
  subjectListNormalized
});

export default staff;
