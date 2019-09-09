import reducerRegistry from '../utils/reducerRegistry';

const initialState = null;

const reducerName = 'redirect';

const createActionName = name => `app/${reducerName}/${name}`;

// actions name
const REDIRECT = createActionName('REDIRECT');
const CLEAR_REDIRECT = createActionName('CLEAR_REDIRECT');

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REDIRECT:
      return action.to;
    case CLEAR_REDIRECT: {
      return null;
    }
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// action creators
export const redirectTo = to => ({ to, type: REDIRECT });
export const clearRedirect = () => ({ type: CLEAR_REDIRECT });
