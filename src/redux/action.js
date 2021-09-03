import { CHANGE_LANGUAGE } from './actionTypes';

// Action Creator
const changeLanguage = language => {
    return {
        type: CHANGE_LANGUAGE,
        payload: String(language)
    }
}

export { changeLanguage };