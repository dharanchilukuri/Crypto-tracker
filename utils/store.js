import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cryptoReducer from './cryptoSlice';

// Persist config object
const persistConfig = {
  key: 'root', // Key for the persisted reducer
  storage, // Type of storage (localStorage here)
};

const persistedReducer = persistReducer(persistConfig, cryptoReducer);

const store = configureStore({
  reducer: {
    crypto: persistedReducer, // The key `crypto` corresponds to how you access it in `useSelector`
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check to avoid errors with redux-persist
    }),
});

export const persistor = persistStore(store);

export default store;
