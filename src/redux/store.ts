// import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ILanguage } from './action';
import { IRatings, reducerLanguage, reducerLoadComments, reducerLogin } from './reducer';

export interface IStateRedux {
    language: {
        language: ILanguage;
    },
    isLogged: {
        isLogged?: boolean;
    },
    comments: {
        comments: IRatings[]
    }
}

const storeState = combineReducers({
    language: reducerLanguage,
    isLogged: reducerLogin,
    comments: reducerLoadComments,
});

const storeConfig = createStore(
    storeState,
    // compose(applyMiddleware(thunk))
);

export default storeConfig;