import {
    SET_CANDIDATES,
    SET_LOADING_CANDIDATES,
    SET_CANDIDATE_DETAILS,
    SET_LOADING_CANDIDATE_DETAILS,
} from './actionType'

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

function setCandidateDetails(payload) {
    return {
        type: SET_CANDIDATE_DETAILS,
        payload,
    }
}

function setLoadingCandidateDetails(payload) {
    return {
        type: SET_LOADING_CANDIDATE_DETAILS,
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

export function fetchCandidateById(id) {
    return async function (dispatch, getState) {
        try {
            dispatch(setLoadingCandidateDetails(true))

            let response = await candidateApi({
                method: 'GET',
                url: `/users?id=${id}`,
            })

            dispatch(setCandidateDetails(response.data))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoadingCandidateDetails(false))
        }
    }
}
