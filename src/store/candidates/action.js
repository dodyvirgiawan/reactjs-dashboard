import {
    SET_CANDIDATES,
    SET_LOADING_CANDIDATES,
    SET_CANDIDATE_DETAILS,
    SET_LOADING_CANDIDATE_DETAILS,
    ADD_ACCEPTED_CANDIDATES,
    ADD_DECLINED_CANDIDATES,
    ADD_SAVED_CANDIDATES,
} from './actionType'

import jsonplaceholderApi from '../../apis/jsonplaceholderApi'
import isCandidateAlreadyProcessed from '../../helpers/isCandidateAlreadyProcessed'

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

export function fetchCandidates() {
    return async function (dispatch) {
        try {
            dispatch(setLoadingCandidates(true))

            let response = await jsonplaceholderApi({
                method: 'GET',
                url: '/users',
            })

            dispatch(setCandidates(response.data))
        } catch (err) {
            toast.error('Sorry, an error has occured while fetching candidates!')
        } finally {
            dispatch(setLoadingCandidates(false))
        }
    }
}

export function fetchCandidateById(queryParams) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingCandidateDetails(true))

            let response = await jsonplaceholderApi({
                method: 'GET',
                url: `/users?${queryParams}`,
            })

            dispatch(setCandidateDetails(response.data))
        } catch (err) {
            toast.error('Sorry, an error has occured while fetching candidate details!')
        } finally {
            dispatch(setLoadingCandidateDetails(false))
        }
    }
}

export function saveCandidate(payload) {
    return function (dispatch, getState) {
        const { candidate } = getState()
        const foundSavedCandidates = candidate.savedCandidates.find((el) => el.id === payload.id)

        if (foundSavedCandidates) {
            toast.error(`${payload.name} is already saved!`)
        } else {
            dispatch(addSavedCandidates(payload))
            toast.success(`${payload.name} successfully saved!`)
        }
    }
}

export function acceptCandidate(payload) {
    return function (dispatch, getState) {
        const { candidate } = getState()

        const isAlreadyProcessed = isCandidateAlreadyProcessed(
            payload,
            candidate.acceptedCandidates,
            candidate.declinedCandidates
        )

        if (isAlreadyProcessed) {
            toast.error(`${payload.name} is already processed!`)
        } else {
            dispatch(addAcceptedCandidates(payload))
            toast.success(`${payload.name} successfully accepted!`)
        }
    }
}

export function declineCandidate(payload) {
    return function (dispatch, getState) {
        const { candidate } = getState()

        const isAlreadyProcessed = isCandidateAlreadyProcessed(
            payload,
            candidate.acceptedCandidates,
            candidate.declinedCandidates
        )

        if (isAlreadyProcessed) {
            toast.error(`${payload.name} is already processed!`)
        } else {
            dispatch(addDeclinedCandidates(payload))
            toast.success(`${payload.name} successfully declined!`)
        }
    }
}
