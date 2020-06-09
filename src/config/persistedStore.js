import { createStore } from "redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import myReducer from '../reducers';


const config = {
    key: "primary",
    storage
}

let persistedReducer = persistCombineReducers(config, myReducer);

export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return {
        store,
        persistor
    }
}