import { configureStore } from '@reduxjs/toolkit';
import partsReducer from './reducers/partsReducer';

const store = configureStore({
  reducer: {
    parts: partsReducer
  }
});

export default store;