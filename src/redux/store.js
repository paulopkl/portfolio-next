import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducer';

const storeState = combineReducers({
    language: reducers
});

const storeConfig = createStore(storeState);

export default storeConfig;