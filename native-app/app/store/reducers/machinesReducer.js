import {createReducer, createAction} from '@reduxjs/toolkit';

const initialState = {
  machines: null,
  scores: {
    factory: null,
    machineScores: null
  }
};

const updateScores = createAction('UPDATE_SCORES');
const addPart = createAction('ADD_PART');
const resetMachineData = createAction('RESET_MACHINE_DATA');

export default machinesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateScores, (state, action) => {
      return {
        ...state,
        scores: {
          factory: action.payload.factory,
          machineScores: {
            ...action.payload.machineScores
          }
        }
      };
    })
    .addCase(addPart, (state, action) => {
      return {
        ...state.machines,
        [action.payload.machineName]: {
          ...(state.machines && action.payload.machineName in state.machines && state.machines[action.payload.machineName]),
          [action.payload.partName]: action.payload.partValue
        }
      };
    })
    .addCase(resetMachineData, (state, action) => {
      return initialState;
    })
});