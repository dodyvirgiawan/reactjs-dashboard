import {
    SET_CANDIDATES,
    SET_LOADING_CANDIDATES,
    SET_CANDIDATE_DETAILS,
    SET_LOADING_CANDIDATE_DETAILS,
} from './actionType'

const initialState = {
    candidates: [],
    loadingCandidates: false,
    candidateDetails: [],
    loadingCandidateDetails: false,
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
        case SET_CANDIDATE_DETAILS:
            return {
                ...state,
                candidateDetails: action.payload,
            }
        case SET_LOADING_CANDIDATE_DETAILS:
            return {
                ...state,
                loadingCandidateDetails: action.payload,
            }
        default:
            return state
    }
}
