import getId from 'uuid/v4';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { ROLES, STAFF_TABLE_TYPE, STAFF_TABLE_STATUS } from '../../utils/constants';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import * as actions from './staffActions';

const userScheme = {
  id: null,
  roles: [ROLES.MANAGER],
  subjects: [],
  email: '',
  firstName: '',
  lastName: '',
  status: null,
  isChecked: false,
  isChanged: false
};

const minRowCount = 5;

const invitationsInitial = () =>
  Array(minRowCount)
    .fill(null)
    .map(() => ({ ...userScheme, id: getId() }));

const invitationsData = handleActions(
  {
    [actions.createNewRow.TRIGGER](state) {
      return [...state, { ...userScheme, id: getId() }];
    },
    [actions.saveTableField.TRIGGER](state, { payload }) {
      const { table, field, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
        const row = state.findIndex((item) => item.id === id);

        if (row !== -1) {
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
    [actions.changeTableSubject.TRIGGER](state, { payload }) {
      const { table, id, values } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
        const row = state.findIndex((item) => item.id === id);

        if (row !== -1) {
          const cloned = [...state];

          cloned[row].subjects = values || [];

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
    },
    [actions.clearAll.TRIGGER]() {
      return invitationsInitial();
    }
  },
  invitationsInitial()
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
    },
    [actions.clearAll.TRIGGER]() {
      return {};
    }
  },
  {}
);

const invitationsStatus = makeStatusWithResetReducer(
  actions.pushSendInvitations,
  actions.clearAll.TRIGGER
);

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

        if (row !== -1) {
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
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },

  []
);

const pendingStatus = makeStatusWithResetReducer(
  actions.pushResendInvitations,
  actions.clearAll.TRIGGER
);

const pending = combineReducers({
  status: pendingStatus,
  data: pendingData
});

const activeData = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.active;
    },
    [actions.setUsersStatus.SUCCESS](state, { payload }) {
      const updatedIds = Object.keys(payload).map((key) => Number(key));
      const cloned = [];

      state.forEach((row) => {
        if (updatedIds.indexOf(row.id) !== -1) {
          cloned.push(payload[row.id]);
        } else {
          cloned.push(row);
        }
      });

      return cloned;
    },
    [actions.pushUsersChanges.SUCCESS](state, { payload }) {
      const updatedIds = Object.keys(payload).map((key) => Number(key));
      const cloned = [];

      state.forEach((row) => {
        if (updatedIds.indexOf(row.id) !== -1) {
          cloned.push(payload[row.id]);
        } else {
          cloned.push(row);
        }
      });

      return cloned;
    },
    [actions.pushUsersChanges.FULFILL](state, { payload }) {
      const { table } = payload;

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
        const cloned = state.map((row) => {
          const oldRow = {};

          Object.keys(row).forEach((key) => {
            if (key === '_changes') {
              return;
            }
            oldRow[key] = row[key];
          });

          return oldRow;
        });

        return cloned;
      }

      return state;
    },
    [actions.saveTableField.TRIGGER](state, { payload }) {
      const { table, field, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
        const row = state.findIndex((item) => item.id === Number(id));

        if (row !== -1) {
          const cloned = [...state];

          if (field === 'isChecked') {
            cloned[row] = { ...cloned[row], isChecked: value };
          } else {
            const _changes = cloned[row]._changes || {};

            _changes[field] = value;

            cloned[row] = { ...cloned[row], _changes, isChanged: true };
          }

          return cloned;
        }
      }

      return state;
    },
    [actions.changeTableRole.TRIGGER](state, { payload }) {
      const { table, id, values } = payload;

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
        const row = state.findIndex((item) => item.id === Number(id));

        if (row !== -1) {
          const cloned = [...state];

          const _changes = cloned[row]._changes || {};

          _changes.roles = values ? values.map((item) => item.value) : [];

          cloned[row] = { ...cloned[row], _changes, isChanged: true };
          return cloned;
        }
      }

      return state;
    },
    [actions.changeTableSubject.TRIGGER](state, { payload }) {
      const { table, id, values } = payload;

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
        const row = state.findIndex((item) => item.id === Number(id));

        if (row !== -1) {
          const cloned = [...state];
          const _changes = cloned[row]._changes || { subjects: [...cloned[row].subjects] };

          _changes.subjects = values || [];

          cloned[row] = { ...cloned[row], _changes, isChanged: true };
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
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const activeErrors = handleActions(
  {
    [actions.pushUsersChanges.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.pushUsersChanges.SUCCESS]() {
      return {};
    },
    [actions.pushUsersChanges.TRIGGER]() {
      return {};
    },
    [actions.clearAll.TRIGGER]() {
      return {};
    }
  },
  {}
);

const activeStatus = makeStatusWithResetReducer(actions.pushUsersChanges, actions.clearAll.TRIGGER);

const active = combineReducers({
  status: activeStatus,
  data: activeData,
  errors: activeErrors
});

const subjectList = handleActions(
  {
    [actions.fetchStaffTables.SUCCESS](state, { payload }) {
      return payload.subjects;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const tablesStatus = makeStatusWithResetReducer(actions.fetchStaffTables, actions.clearAll.TRIGGER);

const staff = combineReducers({
  status: tablesStatus,
  invitations,
  pending,
  active,

  subjectList
});

export default staff;
