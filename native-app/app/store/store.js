import { configureStore } from '@reduxjs/toolkit';
import machinesReducer from './reducers/machinesReducer';

const store = configureStore({
  reducer: {
    machines: machinesReducer
  }
});

export default store;