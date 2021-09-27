import {
    SET_CANDIDATES,
    SET_LOADING_CANDIDATES,
    SET_CANDIDATE_DETAILS,
    SET_LOADING_CANDIDATE_DETAILS,
    ADD_ACCEPTED_CANDIDATES,
    ADD_DECLINED_CANDIDATES,
    ADD_SAVED_CANDIDATES,
} from './actionType'

const initialState = {
    candidates: [],
    loadingCandidates: false,
    candidateDetails: [],
    loadingCandidateDetails: false,
    acceptedCandidates: [],
    declinedCandidates: [],
    savedCandidates: [],
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
        case ADD_ACCEPTED_CANDIDATES:
            return {
                ...state,
                acceptedCandidates: [...state.acceptedCandidates, action.payload],
            }
        case ADD_DECLINED_CANDIDATES:
            return {
                ...state,
                declinedCandidates: [...state.declinedCandidates, action.payload],
            }
        case ADD_SAVED_CANDIDATES:
            return {
                ...state,
                savedCandidates: [...state.savedCandidates, action.payload],
            }
        default:
            return state
    }
}
