import { createRoutineCreator } from 'redux-saga-routines';

const createToggleRoutine = createRoutineCreator(['TOGGLE']);

export default (prefix = '', name) => createToggleRoutine(`${prefix ? `${prefix}/` : ''}${name}`);
