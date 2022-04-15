import { CHANGE_LANGUAGE } from './actionTypes';

interface IAction {
    type: string,
    payload: string
}

interface IReducerState {
    language: "Portuguese" | "English",
}

export type IReducer = (state: IReducerState, action: IAction) => IReducerState

const initialState: IReducerState = { language: 'Portuguese' }

const reducer: IReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case CHANGE_LANGUAGE: return { language: action.payload as "Portuguese" | "English" }
        default: return state
    }
}

export default reducer;