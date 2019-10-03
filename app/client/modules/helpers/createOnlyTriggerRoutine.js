import { createRoutineCreator } from 'redux-saga-routines';

const createOnlyTriggerRoutine = createRoutineCreator(['TRIGGER']);

export default (prefix = '', name) =>
  createOnlyTriggerRoutine(`${prefix ? `${prefix}/` : ''}${name}`);
