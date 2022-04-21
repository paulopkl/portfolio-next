import { CHANGE_LANGUAGE, CHANGE_LOGIN, LOAD_COMMENTS } from './actionTypes';

interface IAction {
    type: string,
    payload: string | boolean
}

interface IReducerLanguageState {
    language: "Portuguese" | "English",
}

export type IReducerLanguage = (state: IReducerLanguageState, action: IAction) => IReducerLanguageState
const initialState: IReducerLanguageState = { language: 'Portuguese' }
const reducerLanguage: IReducerLanguage = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE: return { language: action.payload as "Portuguese" | "English" }
        default: return state
    }
}

interface IReducerLoginState {
    isLogged?: boolean,
}

export type IReducerLogin = (state: IReducerLoginState, action: IAction) => IReducerLoginState
const initialStateLogin: IReducerLoginState = { isLogged: false }
const reducerLogin: IReducerLogin = (state = initialStateLogin, action) => {
    switch (action.type) {
        case CHANGE_LOGIN: return { isLogged: !!action.payload }
        default: return state
    }
}

interface IActionComments {
    type: string,
    payload: IRatings[]
}

export interface IRatings {
    author: string;
    description: string;
    created_at: string;
    language: string;
}

export interface IReducerCommentsState {
    comments: IRatings[],
}

export type IReducerComments = (state: IReducerCommentsState, action: IActionComments) => IReducerCommentsState
const initialStateComments: IReducerCommentsState = { comments: [] }
const reducerLoadComments: IReducerComments = (state = initialStateComments, action) => {
    switch (action.type) {
        case LOAD_COMMENTS: return { comments: action.payload }
        default: return state
    }
}

export { reducerLanguage, reducerLogin, reducerLoadComments };