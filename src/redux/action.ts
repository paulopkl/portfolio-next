import axios from 'axios';
import { CHANGE_LANGUAGE, CHANGE_LOGIN, LOAD_COMMENTS } from './actionTypes';
import { IRatings } from './reducer';

export type ILanguage = "Portuguese" | "English";
export type IChangeAction = (dispatch: any) => { type: any, payload: string | boolean }
export type ILoadComments = (payload: IRatings[]) => { type: any, payload: IRatings[] }

// Action Creator
const changeLanguage: IChangeAction = (language) => {
    return {
        type: CHANGE_LANGUAGE,
        payload: String(language)
    }
}

const changeLogin: IChangeAction = (login) => {
    return {
        type: CHANGE_LOGIN,
        payload: login
    }
}

const loadComments: ILoadComments = (payload) => {
    // return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/signup`)
    //     .then(res => ({ type: LOAD_COMMENTS, payload: res.data }))
    //     // .catch(console.error);

    return { type: LOAD_COMMENTS, payload }
};

export { changeLanguage, changeLogin, loadComments };