import { createStore } from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
// import rootReducer from './reducers'
import productData from './product.reducer'

const persistConfig = {
    key: 'root',
    storage,
}


const rootReducer=combineReducers({
    productData
});

const persisitedReducer = persistReducer(persistConfig,rootReducer);

export let store = createStore(persisitedReducer)
export let persistor=persistStore(store)