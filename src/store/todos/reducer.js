import { SET_TODOS, SET_LOADING_TODOS } from './actionType'

const initialState = {
    todos: [],
    loadingTodos: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: action.payload,
            }
        case SET_LOADING_TODOS:
            return {
                ...state,
                loadingTodos: action.payload,
            }
        default:
            return state
    }
}
