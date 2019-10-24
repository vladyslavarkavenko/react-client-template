/* eslint-disable */
import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

export const prefix = 'benchmarks';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const toggleFilterSidebar = createOnlyTriggerBound('FILTER_SIDEBAR_TOGGLE');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');
