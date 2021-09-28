import { SET_TODOS, SET_LOADING_TODOS } from './actionType'

import jsonplaceholderApi from '../../apis/jsonplaceholderApi'

import { toast } from 'react-toastify'

function setTodos(payload) {
    return {
        type: SET_TODOS,
        payload,
    }
}

function setLoadingTodos(payload) {
    return {
        type: SET_LOADING_TODOS,
        payload,
    }
}

export function fetchTodos(queryParams) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingTodos(true))

            let response = await jsonplaceholderApi({
                method: 'GET',
                url: `/todos?${queryParams}`,
            })

            dispatch(setTodos(response.data))
        } catch (err) {
            toast.error('Sorry, an error has occured while fetching todos!')
        } finally {
            dispatch(setLoadingTodos(false))
        }
    }
}
