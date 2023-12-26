import {createReducer, createAction} from '@reduxjs/toolkit';

const initialState = {
  machines: null
};

const addPart = createAction('ADD_PART');
const addScore = createAction('ADD_SCORE');
const resetMachineData = createAction('RESET_MACHINE_DATA');

export default partsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addScore, (state, action) => {})
    .addCase(addPart, (state, action) => {
      return {
        machines: {
          ...state.machines,
          [action.payload.machineName]: {
            ...state.machines[action.payload.machineName],
            [action.payload.partName]: action.payload.partValue
          }
        }
      };
    })
    .addCase(resetMachineData, (state, action) => {
      return initialState;
    })
});