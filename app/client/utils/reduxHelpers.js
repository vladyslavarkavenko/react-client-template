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

  return handleActions({
    ...generateStatusActions(action),
    [resetAction]() {
      return 'none';
    }
  });
}
