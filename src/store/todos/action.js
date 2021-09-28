import { SET_TODOS, SET_LOADING_TODOS } from './actionType'

import jsonplaceholderApi from '../../apis/jsonplaceholderApi'

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

            console.log(`/todos?${queryParams}`, '<<<<')

            dispatch(setTodos(response.data))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoadingTodos(false))
        }
    }
}
