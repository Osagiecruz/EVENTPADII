import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// ✅ Correct import name
import authReducer from './slices/authSlice';
// Uncomment and import these slices only if they exist
// import userReducer from './slices/userSlice';
// import chatReducer from './slices/chatSlice';
// import postReducer from './slices/postSlice';
// import notificationReducer from './slices/notificationSlice';
// import uiReducer from './slices/uiSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Adjust this depending on what's actually used
};

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  // chat: chatReducer,
  // posts: postReducer,
  // notifications: notificationReducer,
  // ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
