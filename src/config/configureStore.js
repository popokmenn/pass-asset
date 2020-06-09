import { combineReducers, createStore } from 'redux';
import reducers from '../reducers';
import devToolsEnhancer from 'remote-redux-devtools';

export default function configureStore() {
  return createStore(
    combineReducers({ ...reducers }),
    devToolsEnhancer()
  );
}