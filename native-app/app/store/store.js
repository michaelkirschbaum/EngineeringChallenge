import { configureStore } from '@reduxjs/toolkit';
import machinesReducer from './reducers/machinesReducer';

const store = configureStore({
  reducer: {
    machineData: machinesReducer
  }
});

export default store;