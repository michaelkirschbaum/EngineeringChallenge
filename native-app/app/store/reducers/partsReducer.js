import {createReducer, createAction} from '@reduxjs/toolkit';

const initialState = [];

const addParts = createAction('ADD_PARTS');
const resetParts = createAction('RESET_PARTS');

export default partsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addParts, (state, action) => {
      return state;
    })
    .addCase(resetParts, (state, action) => {
      return state;
    })
});