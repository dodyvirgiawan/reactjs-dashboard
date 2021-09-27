import {
    SET_CANDIDATES,
    SET_LOADING_CANDIDATES,
    SET_CANDIDATE_DETAILS,
    SET_LOADING_CANDIDATE_DETAILS,
    ADD_ACCEPTED_CANDIDATES,
    ADD_DECLINED_CANDIDATES,
    ADD_SAVED_CANDIDATES,
} from './actionType'

import candidateApi from '../apis/candidateApi'
import isCandidateAlreadyProcessed from '../helpers/isCandidateAlreadyProcessed'

import { toast } from 'react-toastify'

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

function addSavedCandidates(payload) {
    return {
        type: ADD_SAVED_CANDIDATES,
        payload,
    }
}

function addAcceptedCandidates(payload) {
    return {
        type: ADD_ACCEPTED_CANDIDATES,
        payload,
    }
}

function addDeclinedCandidates(payload) {
    return {
        type: ADD_DECLINED_CANDIDATES,
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

export function saveCandidate(candidate) {
    return function (dispatch, getState) {
        const { savedCandidates } = getState()
        const foundSavedCandidates = savedCandidates.find((el) => el.id === candidate.id)

        if (foundSavedCandidates) {
            toast.error(`${candidate.name} is already saved!`)
        } else {
            dispatch(addSavedCandidates(candidate))
            toast.success(`${candidate.name} successfully saved!`)
        }
    }
}

export function acceptCandidate(candidate) {
    return function (dispatch, getState) {
        const { acceptedCandidates, declinedCandidates } = getState()

        const isAlreadyProcessed = isCandidateAlreadyProcessed(
            candidate,
            acceptedCandidates,
            declinedCandidates
        )

        if (isAlreadyProcessed) {
            toast.error(`${candidate.name} is already proccessed!`)
        } else {
            dispatch(addAcceptedCandidates(candidate))
            toast.success(`${candidate.name} successfully accepted!`)
        }
    }
}

export function declineCandidate(candidate) {
    return function (dispatch, getState) {
        const { acceptedCandidates, declinedCandidates } = getState()

        const isAlreadyProcessed = isCandidateAlreadyProcessed(
            candidate,
            acceptedCandidates,
            declinedCandidates
        )

        if (isAlreadyProcessed) {
            toast.error(`${candidate.name} is already proccessed!`)
        } else {
            dispatch(addDeclinedCandidates(candidate))
            toast.success(`${candidate.name} successfully declined!`)
        }
    }
}
