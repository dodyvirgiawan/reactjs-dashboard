import { SET_CANDIDATES, SET_LOADING_CANDIDATES } from './actionType'

const initialState = {
    candidates: [],
    loadingCandidates: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CANDIDATES:
            return {
                ...state,
                candidates: action.payload,
            }
        case SET_LOADING_CANDIDATES:
            return {
                ...state,
                loadingCandidates: action.payload,
            }
        default:
            return state
    }
}
