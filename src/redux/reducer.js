import { CHANGE_LANGUAGE } from './actionTypes';
const initialState = { language: 'Portuguese' }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE: return { language: action.payload }
        default: return state
    }
}

export default reducer;