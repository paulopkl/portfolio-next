import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ILanguage } from './action';
import reducers, { IReducer } from './reducer';

export interface IStateRedux {
    language: {
        language: ILanguage;
    }
}

const storeState = combineReducers({
    language: reducers
});

const storeConfig = createStore(storeState);

export default storeConfig;