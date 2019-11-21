import { handleActions } from 'redux-actions';

export function toggleItemInArray(state, payload) {
  const clonedState = [...state];

  if (clonedState.includes(payload)) {
    return clonedState.filter((item) => item !== payload);
  }

  return [...clonedState, payload];
}

const generateStatusActions = (action) => ({
  [action.REQUEST]() {
    return 'request';
  },
  [action.SUCCESS]() {
    return 'success';
  },
  [action.FAILURE]() {
    return 'failure';
  },
  [action.FULFILL]() {
    return 'none';
  }
});

export function makeStatusReducer(action) {
  // generate with multiple actions
  if (Array.isArray(action)) {
    let handlers = {};

    action.forEach((item) => {
      handlers = { ...handlers, ...generateStatusActions(item) };
    });

    return handleActions(handlers, 'none');
  }

  return handleActions(generateStatusActions(action), 'none');
}

export function makeStatusWithResetReducer(action, resetAction) {
  // generate with multiple actions
  if (Array.isArray(action)) {
    let handlers = {
      [resetAction]() {
        return 'none';
      }
    };

    action.forEach((item) => {
      handlers = { ...handlers, ...generateStatusActions(item) };
    });

    return handleActions(handlers, 'none');
  }

  return handleActions(
    {
      ...generateStatusActions(action),
      [resetAction]() {
        return 'none';
      }
    },
    'none'
  );
}

export function makePaginationStatus(action, resetAction) {
  return handleActions(
    {
      [action.REQUEST](state, { payload }) {
        if (payload.isNext) {
          return 'request';
        }

        return state;
      },
      [action.SUCCESS]() {
        return 'success';
      },
      [action.FAILURE](state, { payload }) {
        if (payload.isNext) {
          return 'failure';
        }

        return state;
      },
      [action.FULFILL]() {
        return 'none';
      },
      [resetAction]() {
        return 'none';
      }
    },
    'none'
  );
}
