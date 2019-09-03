import i18n from 'i18next';

import reducerRegistry from '../utils/reducerRegistry';

const reducerName = 'language';

const createActionName = name => `app/${reducerName}/${name}`;

const CHANGE_LANGUAGE = createActionName('CHANGE_LANGUAGE');

const initialState = { lng: undefined };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lng: action.lng,
      };
    default:
      return state;
  }
}

// Action creators
const setLanguage = lng => ({
  lng,
  type: CHANGE_LANGUAGE,
});

export function changeLanguage(lng) {
  return dispatch => import(`../locales/${lng}.json`)
    .then(({ default: resources }) => {
      i18n.init({ lng, resources });
      dispatch(setLanguage(lng));
    })
    .catch((err) => {
      console.log(`Error loading text file for ${lng} \n`, err);
    });
}

reducerRegistry.register(reducerName, reducer);
