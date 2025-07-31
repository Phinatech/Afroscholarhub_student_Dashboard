// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './UserSlice';
// import profileReducer from "./ProfileSlice";
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
//   // blacklist: ["expertId", "profile"]
// };

// const userPersistConfig = {
//   key: 'root',
//   storage,
//   // whitelist: ['accessToken', 'refreshToken'], // Only persist tokens
// };

// // Conditional persist for profile (expertId depends on token)
// const profilePersistConfig = {
//   key: 'root',
//   storage,
//   // blacklist: ['expertId'], // Prevent expertId from persisting by default
// };

// const persistedUserReducer = persistReducer(persistConfig, userReducer);
// const persistedProfileReducer = persistReducer(persistConfig, profileReducer);


// const store = configureStore({
//   reducer: {
//     user: persistedUserReducer, 
//     profile: persistedProfileReducer,
//   },
// });

// const persistor = persistStore(store);

// export { store, persistor };

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { persistStore, persistReducer } from "redux-persist";
import { api } from "../../service/apiSlice";
import scholarReducer from "./scholarSlice"

// 🔹 Configure persist settings
const persistConfig = {
  key: "root", 
  storage, 
  whitelist: ["scholar"], // Only persist the scholar slice
};

// 🔹 Combine reducers and wrap with persistReducer
const rootReducer = combineReducers({
  scholar: scholarReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Create Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist requires this to be disabled
    }).concat(api.middleware),
});

export const persistor = persistStore(store); // 🔹 Persistor for Redux Persist

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

