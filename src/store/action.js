import { SET_CANDIDATES, SET_LOADING_CANDIDATES } from './actionType'

import candidateApi from '../apis/candidateApi'

function setCandidates(payload) {
    return {
        type: SET_CANDIDATES,
        payload,
    }
}

function setLoadingCandidates(payload) {
    return {
        type: SET_LOADING_CANDIDATES,
        payload,
    }
}

export function fetchCandidates(payload) {
    return async function (dispatch, getState) {
        try {
            dispatch(setLoadingCandidates(true))

            let response = await candidateApi({
                method: 'GET',
                url: '/users',
            })

            dispatch(setCandidates(response.data))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoadingCandidates(false))
        }
    }
}
