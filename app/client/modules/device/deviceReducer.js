import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { DEVICE } from '../../utils/constants';
import * as actions from './deviceActions';

const currentWidth = handleActions(
  {
    [actions.deviceChange.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  1920
);

const isMobile = handleActions(
  {
    [actions.deviceChange.SUCCESS](state, { payload }) {
      return payload <= DEVICE.MOBILE;
    }
  },
  false
);

const device = combineReducers({
  currentWidth,
  isMobile
});

export default device;
