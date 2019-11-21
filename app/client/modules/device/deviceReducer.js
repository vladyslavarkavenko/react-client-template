import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { DEVICE } from '../../utils/constants';
import * as actions from './deviceActions';

const currentWidth = handleActions(
  {
    [actions.deviceChange.SUCCESS](state, { payload }) {
      return payload.width;
    }
  },
  1920
);

const currentHeight = handleActions(
  {
    [actions.deviceChange.SUCCESS](state, { payload }) {
      return payload.height;
    }
  },
  1080
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
  isMobile,
  currentWidth,
  currentHeight
});

export default device;
