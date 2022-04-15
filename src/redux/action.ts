import { CHANGE_LANGUAGE } from './actionTypes';

export type ILanguage = "Portuguese" | "English";
export type IChangeLanguage = (dispatch: any) => { type: any, payload: string }

// Action Creator
const changeLanguage: IChangeLanguage = (language) => {
    console.log({ language });
    
    return {
        type: CHANGE_LANGUAGE,
        payload: String(language)
    }
}

export { changeLanguage };