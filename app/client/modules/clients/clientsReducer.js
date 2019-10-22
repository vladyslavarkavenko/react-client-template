import getId from 'uuid/v4';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { STAFF_TABLE_TYPE, STAFF_TABLE_STATUS } from '../../utils/constants';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import * as actions from './clientsActions';

const userScheme = {
  id: null,
  manager: null,
  email: '',
  firstName: '',
  lastName: '',
  status: null,
  isChecked: false,
  isChanged: false
};

const minRowCount = 5;

const generateRows = () => {
  return Array(minRowCount)
    .fill(null)
    .map(() => ({ ...userScheme, id: getId() }));
};

const invitationsInitial = generateRows();

const invitationsData = handleActions(
  {
    [actions.fetchClientsTables.SUCCESS](state, { payload }) {
      if (payload.pending.length < minRowCount) {
        return [
          ...payload.pending,
          ...generateRows().slice(0, minRowCount - payload.pending.length)
        ];
      }

      return payload.pending;
    },
    [actions.createNewRow.TRIGGER](state) {
      return [...state, { ...userScheme, id: getId() }];
    },
    [actions.saveTableField.TRIGGER](state, { payload }) {
      const { table, field, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
        // for generated as string id and integer id from back
        const row = state.findIndex((item) => item.id === id || item.id === Number(id));

        if (row !== -1) {
          const cloned = [...state];

          cloned[row] = { ...cloned[row], [field]: value, isChanged: true };

          return cloned;
        }
      }

      return state;
    },
    [actions.changeTableManager.TRIGGER](state, { payload }) {
      const { table, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.INVITATIONS) {
        const row = state.findIndex((item) => item.id === id);

        if (row !== -1) {
          const cloned = [...state];
          cloned[row].manager = value || null;
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
    [actions.pushSendInvitations.SUCCESS](state, { payload }) {
      const createdUsersId = payload.map((item) => item.tempId);
      const clearedState = state.filter((user) => !createdUsersId.includes(user.id));

      return [...payload, ...clearedState];
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
    [actions.clearAll.TRIGGER]() {
      return generateRows();
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

const activeData = handleActions(
  {
    [actions.fetchClientsTables.SUCCESS](state, { payload }) {
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

            oldRow[key] = row[key] || null;
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
    [actions.changeTableManager.TRIGGER](state, { payload }) {
      const { table, id, value } = payload;

      if (table === STAFF_TABLE_TYPE.ACTIVE) {
        const row = state.findIndex((item) => item.id === Number(id));

        if (row !== -1) {
          const cloned = [...state];

          const _changes = cloned[row]._changes || {};

          _changes.manager = value || null;

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

const tablesStatus = makeStatusWithResetReducer(
  actions.fetchClientsTables,
  actions.clearAll.TRIGGER
);

const managers = handleActions(
  {
    [actions.fetchClientsTables.SUCCESS](state, { payload }) {
      return payload.managers;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const clients = combineReducers({
  status: tablesStatus,
  managers,
  invitations,
  active
});

export default clients;
