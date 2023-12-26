import {createReducer, createAction} from '@reduxjs/toolkit';

const initialState = [];
const resetParts = createAction('RESET_PARTS');

export default partsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetParts, (state, action) => {})
});