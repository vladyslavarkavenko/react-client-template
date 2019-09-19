import { createRoutineCreator } from 'redux-saga-routines';

const createInitRoutine = createRoutineCreator(['INIT', 'STOP']);

export default (prefix = '', name) => createInitRoutine(`${prefix ? `${prefix}/` : ''}${name}`);
