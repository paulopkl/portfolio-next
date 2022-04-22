import axios from 'axios';
import { CHANGE_LANGUAGE, CHANGE_LOGIN, CLEAN_MESSAGE, LOAD_COMMENTS, SHOW_MESSAGE } from './actionTypes';
import { IRatings } from './reducer';

export type ILanguage = "Portuguese" | "English";
export type IChangeLanguage = (param: string) => { type: string, payload: string | boolean }
export type IChangeLogin = (param: boolean) => { type: string, payload: string | boolean }
export type ILoadComments = (param: IRatings[]) => { type: string, payload: IRatings[] }
export type IShowMessage = (param: string) => { type: string, payload: { type: string, message: string } }
export type ICleanMessage = () => { type: string }

// Action Creator
const changeLanguage: IChangeLanguage = (language) => {
    return {
        type: CHANGE_LANGUAGE,
        payload: String(language)
    }
}

const changeLogin: IChangeLogin = (login) => {
    return {
        type: CHANGE_LOGIN,
        payload: login
    }
}

const loadComments: ILoadComments = (payload) => {
    return { 
        type: LOAD_COMMENTS, 
        payload 
    }
};

const cleanMessage: ICleanMessage = () => ({ type: CLEAN_MESSAGE });

const showErrorMessage: IShowMessage = (message) => {
    return { 
        type: SHOW_MESSAGE, 
        payload: {
            type: "Error",
            message
        }
    }
};

const showSuccessMessage: IShowMessage = (message) => {
    return { 
        type: SHOW_MESSAGE, 
        payload: {
            type: "Success",
            message
        }
    }
};

export { changeLanguage, changeLogin, loadComments, cleanMessage, showErrorMessage, showSuccessMessage };