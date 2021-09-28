import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import candidateReducer from './candidates/reducer'
import todoReducer from './todos/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    combineReducers({ candidate: candidateReducer, todo: todoReducer }),
    composeEnhancers(applyMiddleware(thunk))
)

export default store
