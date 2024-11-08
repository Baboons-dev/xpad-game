import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
    userReducer, appReducer
} from './reducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'xpadGame',
    storage,
}
const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store)